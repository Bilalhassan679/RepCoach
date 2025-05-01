import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { wp, hp, isIOS } from '../../theme/responsive';
import { colors } from '../../theme/colors';
import { scale } from '../../theme/typography';
import { typography } from '../../theme';
import { apple, eye, eyeclose, google, lock, logo, sms, splash, user } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      signIn();
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };


  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    } catch (error) {
      console.log('Error saving onboarding status:', error);
    }
  };

  useEffect(() => {
    completeOnboarding();
  }, [completeOnboarding]); 

  const renderInput = (
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    isPassword?: boolean
  ) => (
    <View style={styles.inputContainer}>
      <Image 
        source={user}
        style={[styles.inputIcon, { tintColor: '#F79B00' }]} 
      />
      <TextInput
        selectionColor={colors.primary.main}
        cursorColor={colors.primary.main}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPassword}
        placeholderTextColor="#666"
        autoCapitalize="none"
      />
      {isPassword && (
        <TouchableOpacity 
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Image 
            source={showPassword ? eye : eye}
            style={[styles.inputIcon, { tintColor: '#F79B00', opacity: showPassword ? 1 : 0.5 }]} 
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={logo}
            tintColor={colors.primary.main}
            style={styles.logo}
          />
          <Text style={styles.title}>Sign In To Rep Coach</Text>
          <Text style={styles.subtitle}>Let's personalize your fitness</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Image source={sms} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              placeholderTextColor="#666"
            />
          </View>

          <Text style={styles.formTitle}>Password</Text>
          <View style={styles.inputContainer}>
            <Image source={lock} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={!showPassword ? eye : eyeclose} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={google} style={styles.socialIcon} />
            </TouchableOpacity>
            {isIOS && (
              <TouchableOpacity style={styles.socialButton}>
                <Image source={apple} style={styles.socialIcon} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account? {' '}
              <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
                Sign Up
              </Text>
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: wp('5'),
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: hp('8'),
    marginBottom: hp('4'),
  },
  logo: {
    width: wp('20'),
    height: wp('20'),
    resizeMode: 'contain',
  },
  title: {
    fontSize: scale(24),
    fontFamily: typography.fontFamily.WorkSansBold,
    color: '#000',
    marginTop: hp('2'),
  },
  subtitle: {
    fontSize: scale(14),
    color: '#666',
    marginTop: hp('1'),
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  form: {
    gap: hp('1'),
  },
  formTitle: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.WorkSansBold,
    color: '#000',
    marginTop: hp('2'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: wp('2'),
    paddingHorizontal: wp('4'),
    height: hp('7'),
  },
  input: {
    flex: 1,
    marginLeft: wp('2'),
    color: '#000',
    fontSize: scale(16),
  },
  inputIcon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: '#666',
  },
  eyeIcon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: '#666',
  },
  loginButton: {
    backgroundColor: '#FF0000',
    borderRadius: wp('2'),
    height: hp('7'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2'),
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp('4'),
    marginTop: hp('3'),
  },
  socialButton: {
    padding: wp('3'),
    borderRadius: wp('2'),
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  socialIcon: {
    width: wp('6'),
    height: wp('6'),
  },
  footer: {
    alignItems: 'center',
    marginTop: hp('3'),
  },
  footerText: {
    color: '#666',
    fontSize: scale(14),
    fontFamily: typography.fontFamily.WorkSansRegular,

  },
  linkText: {
    color: '#FF0000',
    fontFamily: typography.fontFamily.WorkSansMedium,
    textDecorationLine: 'underline',
  },
  forgotPassword: {
    color: '#FF0000',
    fontSize: scale(14),
    textAlign: 'center',
    marginTop: hp('2'),
    fontFamily: typography.fontFamily.WorkSansRegular,
    textDecorationLine: 'underline',

  },
});

export default LoginScreen; 