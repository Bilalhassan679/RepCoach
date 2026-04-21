import {
    BASE_URL,
    FcmTokenSend_ENDPOINT,
    HomeScreen_ENDPOINT,
    Logout_ENDPOINT,
    UserProfile_ENDPOINT,
    UserInfo_ENDPOINT,
    Verify_ENDPOINT,
    DeleteAccount_ENDPOINT,
} from './endpoints';
import axios from 'axios';
import { getApp } from '@react-native-firebase/app';
import auth, {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { showError } from '../utils/alert';
import { Platform } from 'react-native';
import { store } from '../store';
import { logout, setAccessToken } from '../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


// ─── Axios Instances ────────────────────────────────────────────────────────

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiNoAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const rawAxios = axios.create(); // Fresh instance with no interceptors

// ─── Global Axios Logger ───────────────────────────────────────────────────

const setupAxiosLogger = (instance: any, name: string) => {
    instance.interceptors.request.use((config: any) => {
        console.log(`🚀 [${name}] Request:`, {
            url: `${config.baseURL ?? ''}${config.url}`,
            method: config.method?.toUpperCase(),
            data: config.data,
            headers: config.headers,
        });
        return config;
    });

    instance.interceptors.response.use(
        (response: any) => {
            console.log(`✅ [${name}] Success:`, {
                url: response.config.url,
                status: response.status,
                data: response.data,
            });
            return response;
        },
        (error: any) => {
            console.log(`❌ [${name}] Error:`, {
                url: error.config?.url,
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });
            return Promise.reject(error);
        }
    );
};

// Apply logger to all instances
setupAxiosLogger(api, 'API');
setupAxiosLogger(apiNoAuth, 'NO-AUTH');
setupAxiosLogger(rawAxios, 'RAW');

// ─── Refresh Token State ────────────────────────────────────────────────────

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });
    failedQueue = [];
};

const refreshAccessToken = async (): Promise<string> => {
    try {
        // 1. Get fresh Firebase token (force refresh = true)
        const firebaseAuth = getAuth(getApp());
        const currentUser = firebaseAuth.currentUser;

        if (!currentUser) throw new Error('No Firebase user found');

        const firebaseToken = await currentUser.getIdToken(true);
        console.log('🔄 Got fresh Firebase token');

        // 2. Get device_id from Redux store
        const state = store.getState();
        const deviceId = state.auth.device_id;

        if (!deviceId) throw new Error('No device_id found in store');

        // 3. Call /refresh-token API (using apiNoAuth to avoid interceptor loop)
        const response = await apiNoAuth.post('/refresh-token', {
            firebase_token: firebaseToken,
            device_id: deviceId,
        });

        const newAccessToken: string = response.data.access_token;
        console.log('✅ New access token received');

        // 4. Save new token to Redux store
        store.dispatch(setAccessToken(newAccessToken));

        return newAccessToken;
    } catch (error) {
        console.error('❌ Token refresh failed:', error);
        throw error;
    }
};

// ─── Request Interceptor — Attach Token & Device ID ────────────────────────

api.interceptors.request.use(config => {
    const state = store.getState();
    const token = state.auth.access_token;
    const deviceId = state.auth.device_id;

    if (config.headers) {
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        if (deviceId) config.headers['X-Device-ID'] = deviceId;
    }

    return config;
});

// ─── Response Interceptor — Handle 401 with Token Refresh ──────────────────

api.interceptors.response.use(
    response => response,
    async error => {
        console.log('❌ API FAILED URL:', error.config?.url);

        const originalRequest = error.config;

        // Handle 401 — attempt token refresh
        if (
            error.response?.status === 401 &&
            !originalRequest._retry // prevent infinite retry loop
        ) {
            // If a refresh is already in progress, queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            resolve(api(originalRequest));
                        },
                        reject: (err: any) => reject(err),
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refreshAccessToken();
                processQueue(null, newToken);

                // Retry the original failed request with the new token
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                console.warn('🔓 Token refresh failed — logging out user');
                await handleLogout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Refresh token logic remains here, but extra logging is handled by global logger
        return Promise.reject(error);
    },
);

// ─── Centralized Logout Handler ─────────────────────────────────────────────

export const handleLogout = async () => {
    try {
        console.log('🚪 Starting logout process...');

        // 1. Get FCM token and call logout API
        const fcmToken = await AsyncStorage.getItem('fcm_token');
        if (fcmToken) {
            try {
                await apiNoAuth.post(Logout_ENDPOINT, { fcm_token: fcmToken });
                console.log('✅ Logout API called successfully');
            } catch (apiError: any) {
                if (axios.isAxiosError(apiError) && apiError.response?.status === 401) {
                    console.warn(
                        '⚠️ Logout API returned 401 — token already invalid, continuing local logout cleanup',
                    );
                } else {
                    console.warn('⚠️ Logout API error:', apiError);
                }
                // Continue with logout cleanup even if logout API fails
            }
        }

        // 2. Dispatch Redux logout action
        store.dispatch(logout());

        // 3. Remove FCM token from AsyncStorage
        await AsyncStorage.removeItem('fcm_token');

        // 4. Sign out from Firebase Auth
        try {
            const firebaseAuth = getAuth();
            await firebaseAuth.signOut();
            console.log('✅ Firebase Auth signed out');
        } catch (firebaseError) {
            console.warn('⚠️ Firebase sign out error:', firebaseError);
        }

        // 5. Sign out from Google (only if signed in)
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            console.log('✅ Google Sign-In signed out');
        } catch (googleError: any) {
            if (googleError?.code !== statusCodes.SIGN_IN_REQUIRED) {
                console.warn('⚠️ Google sign out error:', googleError);
            }
        }

        // 6. Sign out from Apple (iOS only — Apple has no direct signOut)
        if (Platform.OS === 'ios') {
            try {
                console.log('✅ Apple Sign-In credentials cleared');
            } catch (appleError) {
                console.warn('⚠️ Apple sign out error:', appleError);
            }
        }

        console.log('✅ Logout completed successfully');
    } catch (error) {
        console.error('❌ Logout error:', error);
        throw error;
    }
};

export default api;

// ─── Token Verification ─────────────────────────────────────────────────────

export async function verifyToken() {
    try {
        const response = await api.get('/verify');
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.warn('Verify token unauthorized — token is invalid or expired');
            return null;
        }
        console.log(error, 'Verify Error');
        return error.response?.data?.message ?? 'Verify failed';
    }
}

// ─── Auth Types ─────────────────────────────────────────────────────────────

export interface LoginResponse {
    success: boolean;
    data?: any;
    error?: string;
}

// ─── Email/Password Login ───────────────────────────────────────────────────

export async function login(
    email: string,
    password: string,
): Promise<LoginResponse> {
    try {
        const app = getApp();
        const firebaseAuth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
        );
        const firebaseToken = await userCredential.user.getIdToken();
        console.log(firebaseToken, 'Firebase Token', Platform.OS);

        const body = {
            firebase_token: firebaseToken,
            type: 'user',
        };

        const response = await api.post('/login-register', body);
        console.log(response.data, 'Login Response');
        return { success: true, data: response.data };
    } catch (error: any) {
        console.log(error, 'Login error');
        let errorMessage = 'Login failed';

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                errorMessage = 'User not found';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
        } else if (error.code) {
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'User not found';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Invalid password';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/invalid-credential':
                    errorMessage =
                        'Session expired or credential is invalid. Please try again.';
                    break;
                default:
                    errorMessage = error.message || 'Login failed';
            }
        }

        showError(errorMessage);
        return { success: false, error: errorMessage };
    }
}

// ─── Email/Password Register ────────────────────────────────────────────────

export async function register(
    name: string,
    email: string,
    password: string,
    // deviceToken: string,
): Promise<LoginResponse> {
    try {
        const app = getApp();
        const firebaseAuth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
        );

        const firebaseToken = await userCredential.user.getIdToken();

        const body = {
            firebase_token: firebaseToken,
            type: 'user',
            name,
        };

        console.log(body, 'bodyRegister');

        const response = await rawAxios.post('/login-register', body, {
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${firebaseToken}`,
            },
        });

        return { success: true, data: response.data };
    } catch (error: any) {

        let errorMessage = 'Registration failed';

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 409) {
                errorMessage = 'User already exists';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
        } else if (error.code) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Email already in use';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Weak password';
                    break;
                default:
                    errorMessage = error.message || 'Registration failed';
            }
        }

        showError(errorMessage);
        return { success: false, error: errorMessage };
    }
}

// ─── Apple Sign-In ───────────────────────────────────────────────────────────

export const signInWithApple = async () => {
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        const { identityToken, nonce } = appleAuthRequestResponse;
        if (!identityToken) throw new Error('Apple Sign-In failed - no token');

        const appleCredential = auth.AppleAuthProvider.credential(
            identityToken,
            nonce,
        );
        const userCredential = await auth().signInWithCredential(appleCredential);
        const firebaseUser = userCredential.user;

        if (!firebaseUser)
            return { success: false, error: 'Firebase user not found' };

        const firebaseToken = await firebaseUser.getIdToken();
        // const deviceToken = await getDeviceToken();
        console.log('firebaseToken', firebaseToken);

        const body = {
            firebase_token: firebaseToken,
            type: 'candidate',
        };

        const response = await api.post('/login-register', body);
        console.log(response, 'Apple Sign-In Response');
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error('Apple sign-in error:', error);

        if (error.code === appleAuth.Error.CANCELED)
            return {
                success: false,
                status: 499,
                error: 'User cancelled Apple Sign-In',
            };
        if (error.code === appleAuth.Error.FAILED)
            return { success: false, status: 500, error: 'Apple Sign-In failed' };
        if (error.code === appleAuth.Error.INVALID_RESPONSE)
            return {
                success: false,
                status: 500,
                error: 'Invalid Apple Sign-In response',
            };
        if (error.code === appleAuth.Error.NOT_HANDLED)
            return {
                success: false,
                status: 500,
                error: 'Apple Sign-In not handled',
            };
        if (error.code === appleAuth.Error.UNKNOWN)
            return {
                success: false,
                status: 500,
                error: 'Unknown Apple Sign-In error',
            };

        return {
            success: false,
            status: 500,
            error: error.message || 'Unknown sign-in error',
        };
    }
};

// ─── Google Sign-In ──────────────────────────────────────────────────────────

export const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // const userInfo = await GoogleSignin.signIn();

        const { idToken } = await GoogleSignin.getTokens();

        if (!idToken)
            return { success: false, error: 'Google Sign-In failed: No ID token' };

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);
        const firebaseUser = userCredential.user;

        if (!firebaseUser)
            return { success: false, error: 'Firebase user not found' };

        const firebaseToken = await firebaseUser.getIdToken();
        // const deviceToken = await getDeviceToken();
        console.log('firebaseToken', firebaseToken);

        const body = {
            firebase_token: firebaseToken,
            type: 'candidate',
        };

        const response = await api.post('/login-register', body);
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error('Google sign-in error:', error);

        if (error.code === statusCodes.SIGN_IN_CANCELLED)
            return {
                success: false,
                status: 499,
                error: 'User cancelled Google Sign-In',
            };
        if (error.code === statusCodes.IN_PROGRESS)
            return {
                success: false,
                status: 409,
                error: 'Sign-In already in progress',
            };
        if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
            return {
                success: false,
                status: 503,
                error: 'Google Play Services not available or outdated',
            };

        return {
            success: false,
            status: 500,
            error: error.message || 'Unknown sign-in error',
        };
    }
};

// ─── Provider Sign-In Router ─────────────────────────────────────────────────

export const signInWithProvider = async (provider: 'google' | 'apple') => {
    if (provider === 'google') {
        return await signInWithGoogle();
    } else if (provider === 'apple' && Platform.OS === 'ios') {
        return await signInWithApple();
    } else {
        throw new Error('Unsupported provider or platform');
    }
};


export const getHomeScreenData = async () => {
    try {
        const res = await api.get(HomeScreen_ENDPOINT);
        console.log('HomeScreen data:', res.data);
        return res.data;
    } catch (error) {
        console.log('getHomeScreenData error:', error);
        return null;
    }
};

export const getUserProfile = async () => {
    try {
        const res = await api.get(UserProfile_ENDPOINT);
        console.log('User profile data:', res.data);
        return res.data;
    } catch (error) {
        console.log('getUserProfile error:', error);
        return null;
    }
};

type SaveProfilePayload = {
    full_name: string;
    age: number | string;
    bio?: string;
    city?: string;
    state?: string;
    gender: string;
    school_name?: string;
    sports?: number[];
    sport_id?: number | null;
    achievements?: string;
    profile_image_uri?: string;
};

export const saveUserProfile = async (payload: SaveProfilePayload) => {
    const form = new FormData();

    form.append('full_name', payload.full_name);
    form.append('age', String(payload.age));

    if (payload.bio) form.append('bio', payload.bio);
    if (payload.city) form.append('city', payload.city);
    if (payload.state) form.append('state', payload.state);
    if (payload.gender) form.append('gender', payload.gender);
    if (payload.school_name) form.append('school_name', payload.school_name);
    if (payload.achievements) form.append('achievements', payload.achievements);

    if (payload.sports && payload.sports.length > 0) {
        payload.sports.forEach(id => {
            form.append('sports[]', String(id));
        });
    } else if (payload.sport_id) {
        form.append('sports[]', String(payload.sport_id));
    }

    if (payload.profile_image_uri) {
        form.append('profile_image', {
            uri: payload.profile_image_uri.startsWith('file://')
                ? payload.profile_image_uri
                : `file://${payload.profile_image_uri}`,
            type: 'image/jpeg',
            name: 'profile.jpg',
        } as any);
    }

    console.log(form, 'FormReviewApiData');

    const res = await api.post('/user/save-profile', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};

// ─── FCM Token ───────────────────────────────────────────────────────────────

export const sendFcmToBackend = async (payload: { fcm_token: string }) => {
    const res = await api.post(FcmTokenSend_ENDPOINT, payload);
    console.log('FCM token sent:', res.data);
    return res.data;
};

// ─── Password Reset ──────────────────────────────────────────────────────────

export async function resetPassword(email: string): Promise<LoginResponse> {
    try {
        const firebaseAuth = getAuth();
        await sendPasswordResetEmail(firebaseAuth, email.trim());
        return {
            success: true,
            data: { message: 'Password reset email sent successfully' },
        };
    } catch (error: any) {
        console.log('Password reset error:', error);
        let errorMessage = 'Failed to send reset email';

        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email address';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many requests. Please try again later';
                break;
            default:
                errorMessage = error.message || 'Failed to send reset email';
        }

        return { success: false, error: errorMessage };
    }
}

// ─── Verify User ─────────────────────────────────────────────────────────────

export const verifyUser = async () => {
    try {
        const res = await api.get(Verify_ENDPOINT);
        console.log('Verify API Response:', res.data);
        return res.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.warn('Verify API unauthorized — auth token invalid or expired');
            return null;
        }
        console.error('Verify API error:', error);
        throw error;
    }
};

// ─── User Info & Assessment APIs ───────────────────────────────────────────

export interface UserInfoPayload {
    dob?: string;               // YYYY-MM-DD
    joining_date?: string;      // YYYY-MM-DD
    gym_type?: string[];        // Array of strings
    gym_equipment?: string[];   // Array of strings
    employment_type?: string;
    job_title?: string;
    workout_days?: number;
    workout_duration?: number;
    goals?: string[];           // Array of strings
    sports?: string[];          // Array of strings
    injury_history?: string;
    injury_pain?: boolean;
    surgeries?: string[];       // Array of strings
    surgry_pain?: boolean;
    diseases?: string[];        // Array of strings
    fat_loss_goal?: string;
    current_fat?: string;
    weight_goal?: string;
    current_weight?: string;
    stretch_score?: number;
    stretch_pain?: boolean;
    post_stretch_score?: number;
    heart_rate?: number;
    exercise_type?: string;
    weight_used?: string;
    reps?: string;
}

export const updateUserInfo = async (payload: UserInfoPayload) => {
    try {
        const res = await api.post(UserInfo_ENDPOINT, payload);
        console.log('Update User Info Response:', res.data);
        return res.data;
    } catch (error) {
        console.error('Update User Info Error:', error);
        throw error;
    }
};

// ─── Account Management ─────────────────────────────────────────────────────

export const deleteAccount = async () => {
    try {
        const res = await api.delete(DeleteAccount_ENDPOINT);
        console.log('Delete Account Response:', res.data);

        // Clean up locally after successful deletion
        await handleLogout();

        return res.data;
    } catch (error) {
        console.error('Delete Account Error:', error);
        throw error;
    }
};
