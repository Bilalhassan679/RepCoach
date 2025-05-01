import React, { createContext, useState, useContext } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  isAssessmentCompleted: boolean;
  signIn: () => void;
  signOut: () => void;
  user: any;
  setUser: (user: any) => void;
  completeAssessment: () => void;
  setIsAssessmentCompleted: (isCompleted: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAssessmentCompleted, setIsAssessmentCompleted] = useState(false);
  const [user, setUser] = useState(null);

  const signIn = () => {
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setIsAssessmentCompleted(false);
  };

  const completeAssessment = () => {
    setIsAssessmentCompleted(true);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isAssessmentCompleted,
      signIn, 
      signOut, 
      user, 
      setUser,
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