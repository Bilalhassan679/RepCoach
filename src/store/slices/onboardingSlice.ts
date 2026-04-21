import { createSlice } from '@reduxjs/toolkit';

interface OnboardingState {
  hasSeenOnboarding: boolean;              // intro splash screens (AuthNavigator)
  hasAskedNotificationPermission: boolean; // notification permission screen
  onboardingCompleted: boolean;            // profile creation flow (Intro → Plans)
}

const initialState: OnboardingState = {
  hasSeenOnboarding: false,
  hasAskedNotificationPermission: false,
  onboardingCompleted: false,              // false on fresh install
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    // After user finishes splash/intro screens (AuthNavigator)
    completeOnboarding: state => {
      state.hasSeenOnboarding = true;
    },
    // After notification permission screen is shown
    setNotificationPermissionAsked: state => {
      state.hasAskedNotificationPermission = true;
    },
    // After saveUserProfile succeeds in ReviewInformation
    setOnboardingCompleted: state => {
      state.onboardingCompleted = true;
    },
    // Called from Settings to re-trigger the profile creation flow
    resetOnboardingCompleted: state => {
      state.onboardingCompleted = false;
    },
    // Full reset if needed
    resetOnboarding: state => {
      state.hasSeenOnboarding = false;
      state.hasAskedNotificationPermission = false;
      state.onboardingCompleted = false;
    },
  },
});

export const {
  completeOnboarding,
  setNotificationPermissionAsked,
  setOnboardingCompleted,
  resetOnboardingCompleted,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;