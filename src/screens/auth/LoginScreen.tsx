import React, { useState } from 'react';
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
import { Splash } from '../../assets';
import { wp, hp, isIOS } from '../../theme/responsive';
import { colors } from '../../theme/colors';
import { scale } from '../../theme/typography';
import { typography } from '../../theme';

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

  const renderInput = (
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    isPassword?: boolean
  ) => (
    <View style={styles.inputContainer}>
      <Image 
        source={require('../../assets/images/user.png')}
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
            source={require('../../assets/images/eye.png')}
            style={[styles.inputIcon, { tintColor: '#F79B00', opacity: showPassword ? 1 : 0.5 }]} 
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ImageBackground source={Splash} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Log In</Text>
            
            <View style={styles.whiteCard}>
              <View style={styles.form}>
                {renderInput('Email Address', email, setEmail)}
                {renderInput('Password', password, setPassword, true)}
                
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.rememberForgotContainer}>
                  <TouchableOpacity 
                    style={styles.rememberContainer} 
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                      {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.rememberText}>Remember me</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                  >
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  style={[styles.button, loading && styles.buttonDisabled]} 
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Log in</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>Or Log in With</Text>
                  <View style={styles.divider} />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image 
                      source={require('../../assets/images/google.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                 {isIOS && <TouchableOpacity style={styles.socialButton}>
                      <Image 
                        source={require('../../assets/images/apple.png')}
                        style={styles.socialIcon}
                      />
                    </TouchableOpacity>}
                </View>

                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={styles.linkText}>
                    Don't Have An Account? <Text style={styles.signUpText}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: scale(32),
    fontFamily: typography.fontFamily.apolloRegular,
    color: colors.primary.main,
    marginBottom: hp('2'),
    marginTop: hp(isIOS ? '25' : '21'),
    marginLeft: wp('2'),

  },
  whiteCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('8'),
    borderTopRightRadius: wp('8'),
    padding: wp('5'),
    flex: 1,
  },
  form: {
    gap: hp('2'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: hp('7'),
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interRegular,
    marginLeft: wp('2'),
  },
  inputIcon: {
    width: wp('5'),
    height: wp('5'),
  },
  eyeIcon: {
    padding: wp('2'),
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1'),
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: wp('5'),
    height: wp('5'),
    borderWidth: 1,
    borderColor: '#F79B00',
    borderRadius: wp('1'),
    marginRight: wp('2'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#F79B00',
  },
  checkmark: {
    color: '#fff',
    fontSize: scale(12),
  },
  rememberText: {
    color: '#666',
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
  },
  forgotText: {
    color: '#F79B00',
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
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
    marginTop: hp('2'),
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('3'),
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
    fontFamily: typography.fontFamily.interRegular,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp('8'),
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
    color: '#666',
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
  },
  signUpText: {
    color: '#F79B00',
    fontFamily: typography.fontFamily.interMedium,
  },
});

export default LoginScreen; 