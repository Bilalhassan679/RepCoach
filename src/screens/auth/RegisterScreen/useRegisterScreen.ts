import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { registerSchema, RegisterForm } from '../../../utils/schema';
import { register as registerApi } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { showError } from '../../../utils/alert';

export type AuthStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export const useRegisterScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Register'>>();
  const { signIn } = useAuth();

  const form = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: 'Shareef',
      lastName: 'Kabeer ',
      email: 'shareef@yopmail.com',
      password: 'Test@123',
      confirmPassword: 'Test@123',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      const res = await registerApi(fullName, data.email, data.password);

      if (res.success && res.data) {
        // Automatically log in the user after successful registration
        signIn(res.data);
      } else if (res.error) {
        // Error shown in registerApi via showError
      }
    } catch (error: any) {
      console.error('Register onSubmit error:', error);
      showError('An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return {
    ...form,
    loading,
    onSubmit,
    navigation,
  };
};
