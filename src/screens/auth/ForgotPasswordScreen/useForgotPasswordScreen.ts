import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ForgotPasswordForm} from '../../../utils/schema';
import {forgotPasswordSchema} from '../../../utils/schema';

export type AuthStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export const useForgotPasswordScreen = () => {
  const [loading, setLoading] = useState(false);

  // Navigation
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>
    >();

  // Form
  const form = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {email: ''},
  });

  // Submit
  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert(
        'Success',
        'Password reset instructions have been sent to your email',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ],
      );
      form.reset();
    } catch (err) {
      // Optionally handle error
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
