import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Platform } from 'react-native';

interface User {
  id: string | null;
  email: string;
  name: string;
  image: string;
  access_token: string | null;
  isGuest?: boolean;
  
  // Fitness & Assessment fields
  dob?: string;
  joining_date?: string;
  gym_type?: string[];
  gym_equipment?: string[];
  employment_type?: string;
  job_title?: string;
  workout_days?: number;
  workout_duration?: number;
  goals?: string[];
  sports?: string[];
  injury_history?: string;
  injury_pain?: boolean;
  surgeries?: string[];
  surgry_pain?: boolean;
  diseases?: string[];
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

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  deviceToken: string | null; // FCM token
  device_id: string | null; // Backend device id

  access_token: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  deviceToken: null,
  device_id: null,
  access_token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ✅ Handles both real and guest user login
    setUser: {
      reducer: (
        state,
        action: PayloadAction<{
          user: User | null;
          access_token: string | null;
          device_id: string | null;
        }>,
      ) => {
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.device_id = action.payload.device_id;
        state.isAuthenticated = !!action.payload.user;
      },

      prepare: (rawResponse: any) => {
        return {
          payload: {
            user: rawResponse?.user ?? null,
            access_token: rawResponse?.access_token ?? null,
            device_id: rawResponse?.device_id ?? null,
          },
        };
      },
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.access_token = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearUser: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.access_token = null;
    },

    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
      state.access_token = null;
      state.device_id = null;
    },

    setDeviceToken: (state, action: PayloadAction<string | null>) => {
      console.log(action.payload, 'action.payload');
      state.deviceToken = action.payload;
    },

    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },
  },
});

export const {
  setUser,
  setAccessToken,
  setLoading,
  setError,
  clearUser,
  logout,
  setDeviceToken,
  updateUserInfo,
} = authSlice.actions;

export default authSlice.reducer;
