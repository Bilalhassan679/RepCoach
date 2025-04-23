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
import { Splash, google,apple, eye, eyeoff, user, sms, lock } from '../../assets';
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
            <Text style={styles.title}>Sign Up</Text>
            
            <View style={styles.whiteCard}>
              <View style={styles.form}>
                {renderInput('First Name', firstName, setFirstName, false, undefined, undefined, user)}
                {renderInput('Last Name', lastName, setLastName, false, undefined, undefined, user)}
                {renderInput('Email Address', email, setEmail, false, undefined, undefined, sms)}
                {renderInput('Password', password, setPassword, true, showPassword, setShowPassword, lock)}
                {renderInput('Confirm Password', confirmPassword, setConfirmPassword, true, showConfirmPassword, setShowConfirmPassword, lock)}
                
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity 
                  style={[styles.button, loading && styles.buttonDisabled]} 
                  onPress={handleSignUp}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>Or Sign Up With</Text>
                  <View style={styles.divider} />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image 
                      source={google}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                 {isIOS && <TouchableOpacity style={styles.socialButton}>
                    <Image 
                      source={apple}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>}
                </View>

                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.linkText}>
                    Already Have An Account? <Text style={styles.loginText}>Log In</Text>
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
    marginTop: hp(isIOS ? '12' : '10'),
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
    fontFamily: typography.fontFamily.interMedium,
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
    fontFamily: typography.fontFamily.interRegular,
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
    color: '#666',
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
  },
  loginText: {
    color: '#F79B00',
    fontFamily: typography.fontFamily.interMedium,
  },
});

export default RegisterScreen; 