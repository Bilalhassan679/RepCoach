// API Base URL
export const BASE_URL = 'https://virtualrealitycreators.com/repcoach-backend/public/api';

// Refresh token endpoint – returns a new access_token when the current token is expired
export const RefreshToken_ENDPOINT = `${BASE_URL}/refresh-token`;

// Image Base URL (update if you have a specific one)
export const IMAGE_BASE_URL = (image: string) => {
  return 'https://virtualrealitycreators.com/repcoach-backend/public/storage' + image;
};

// Endpoints

// export const Auth_ENDPOINT = `${BASE_URL}/login-register`;
export const User_ENDPOINT = `${BASE_URL}/user`;
export const HomeScreen_ENDPOINT = `/user/home-screen`;
export const FcmTokenSend_ENDPOINT = `${BASE_URL}/user/save-fcm`;
export const UserProfile_ENDPOINT = `${BASE_URL}/user/profile`;
export const UserInfo_ENDPOINT = `${BASE_URL}/user/info`;
export const Verify_ENDPOINT = `${BASE_URL}/verify`;
export const Logout_ENDPOINT = `${BASE_URL}/logout`;
export const DeleteAccount_ENDPOINT = `${BASE_URL}/user`;
