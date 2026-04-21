import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginForm } from '../../../utils/schema';
import { login as loginApi } from '../../../services/api';
import { showError } from '../../../utils/alert';

export type AuthStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  InformationGatheringScreen: undefined;
};

export const useLoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Login'>>();
    
  const form = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const res = await loginApi(data.email, data.password);
      
      if (res.success && res.data) {
        signIn(res.data);
        // Note: Navigation to Home or Assessment is handled dynamically by RootNavigator based on auth state
      } else if (res.error) {
        // Error is already shown inside loginApi via showError, but we can add extra handling here if needed
      }
    } catch (error: any) {
      console.error('Login onSubmit error:', error);
      showError('An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return {
    ...form,
    navigation,
    loading,
    onSubmit,
    showPassword,
    setShowPassword,
  };
};
