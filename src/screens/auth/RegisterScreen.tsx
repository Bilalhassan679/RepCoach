import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { splash, google,apple, eye, eyeoff, user, sms, lock,  eyeclose, logo } from '../../assets';
import { wp, hp, isIOS } from '../../theme/responsive';
import { colors } from '../../theme/colors';
import { scale } from '../../theme/typography';
import { typography } from '../../theme';

const RegisterScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    if (!firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      // Implement signup logic here
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.navigate('Login');
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    isPassword?: boolean,
    showPasswordState?: boolean,
    setShowPasswordState?: (show: boolean) => void,
    icon?: any,
    keyboardType?: any
  ) => (
    <View style={styles.inputContainer}>
      <Image 
        source={icon}
        style={[styles.inputIcon, { tintColor: '#F79B00' }]} 
      />
      <TextInput
       selectionColor={colors.primary.main}
        cursorColor={ colors.primary.main}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPasswordState}
        placeholderTextColor="#666"

        autoCapitalize="none"
      />
      {isPassword && setShowPasswordState && (
        <TouchableOpacity 
          onPress={() => setShowPasswordState(!showPasswordState)}
          style={styles.eyeIcon}
        >
          <Image 
            source={showPasswordState ? eye : eyeoff}
            style={[styles.inputIcon, { tintColor: showPasswordState ? '#F79B00' : '#666',  }]} 
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
          <Text style={styles.title}>Sign Up For Free</Text>
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

          <Text style={styles.formTitle}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <Image source={lock} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Image source={!showConfirmPassword ? eye : eyeclose} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account? {' '}
              <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
                Sign In
              </Text>
            </Text>
          </View>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: wp('5'),
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
  
  errorText: {
    color: colors.secondary.main,
    fontSize: scale(14),
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F79B00',
    padding: hp('2'),
    borderRadius: wp('2'),
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1'),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    color: '#666',
    fontSize: scale(14),
    marginHorizontal: wp('3'),
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp('4'),
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: wp('4'),
    borderRadius: wp('50'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialIcon: {
    width: wp('7'),
    height: wp('7'),
    resizeMode: 'contain',
  },
  linkButton: {
    marginTop: hp('3'),
    alignItems: 'center',
  },
  linkText: {
    color: '#FF0000',
    fontFamily: typography.fontFamily.WorkSansMedium,
    textDecorationLine: 'underline',
  },
  loginText: {
    color: '#F79B00',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  forgotText: {
    color: '#F79B00',
    fontFamily: typography.fontFamily.WorkSansMedium,
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
  signUpButton: { 
    backgroundColor: '#FF0000',
    borderRadius: wp('2'),
    height: hp('7'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2'),
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
 
});

export default RegisterScreen; 