import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { splash, google, apple, eye, eyeclose, user, sms, lock, logo } from '../../../assets';
import { wp, hp, isIOS } from '../../../theme/responsive';
import { colors } from '../../../theme/colors';
import { useRegisterScreen } from './useRegisterScreen';
import { Controller } from 'react-hook-form';
import { typography } from '../../../theme';
import { scale } from '../../../theme/typography';

const RegisterScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    loading,
    onSubmit,
    navigation,
  } = useRegisterScreen();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
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
            <Text style={styles.formTitle}>First Name</Text>
            <View style={styles.inputContainer}>
              <Image source={user} style={styles.inputIcon} />
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    placeholderTextColor="#666"
                    returnKeyType="next"
                  />
                )}
              />
            </View>
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}

            <Text style={styles.formTitle}>Last Name</Text>
            <View style={styles.inputContainer}>
              <Image source={user} style={styles.inputIcon} />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    placeholderTextColor="#666"
                    returnKeyType="next"
                  />
                )}
              />
            </View>
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}

            <Text style={styles.formTitle}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Image source={sms} style={styles.inputIcon} />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor="#666"
                    returnKeyType="next"
                  />
                )}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            <Text style={styles.formTitle}>Password</Text>
            <View style={styles.inputContainer}>
              <Image source={lock} style={styles.inputIcon} />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#666"
                    returnKeyType="next"
                  />
                )}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword ? eye : eyeclose} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            <Text style={styles.formTitle}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <Image source={lock} style={styles.inputIcon} />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showConfirmPassword}
                    placeholderTextColor="#666"
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Image source={!showConfirmPassword ? eye : eyeclose} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

            <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit(onSubmit)}>
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
      </ScrollView>

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;


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
  // Add scrollContainer style
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp('2'), // Add some bottom padding
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
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
