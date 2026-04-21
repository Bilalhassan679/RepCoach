import React, { createContext, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { logout, setUser } from '../store/slices/authSlice';
import { setOnboardingCompleted } from '../store/slices/onboardingSlice';

type AuthContextType = {
  isAuthenticated: boolean;
  isAssessmentCompleted: boolean;
  signIn: (userData?: any) => void;
  signOut: () => void;
  user: any;
  setUser: (user: any) => void;
  completeAssessment: () => void;
  setIsAssessmentCompleted: (isCompleted: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  // Connect to Redux state
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const isAssessmentCompleted = useAppSelector(state => state.onboarding.onboardingCompleted);

  const signIn = (userData?: any) => {
    if (userData) {
      dispatch(setUser(userData));
    } else {
      // Fallback for current mock behavior if no data passed
      dispatch(setUser({
        user: { id: 'temp', email: 'guest@repcoach.ai', name: 'Guest User', image: '', access_token: 'mock-token' },
        access_token: 'mock-token',
        device_id: 'mock-device'
      }));
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  const completeAssessment = () => {
    dispatch(setOnboardingCompleted());
  };

  const setIsAssessmentCompleted = (isCompleted: boolean) => {
    // This is a bridge to match previous context usage
    if (isCompleted) {
      dispatch(setOnboardingCompleted());
    }
  };

  const handleSetUser = (u: any) => {
    dispatch(setUser(u));
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAssessmentCompleted,
      signIn,

      signOut,
      user,
      setUser: handleSetUser,
      completeAssessment,
      setIsAssessmentCompleted
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
