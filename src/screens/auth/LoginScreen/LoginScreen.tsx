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

import { useLoginScreen } from './useLoginScreen';
import {
  apple,
  eye,
  eyeclose,
  google,
  lock,
  logo,
  sms,
  splash,
  user,
} from '../../../assets';
import { colors } from '../../../theme/colors';
import { hp, isIOS, wp } from '../../../theme/responsive';
import { Controller } from 'react-hook-form';
import { typography } from '../../../theme';
import { scale } from '../../../theme/typography';

const LoginScreen: React.FC = () => {
  const {
    navigation,
    showPassword,
    setShowPassword,
    onSubmit,
    loading,
    control,
    handleSubmit,
    formState: { errors },
  } = useLoginScreen();

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
            <Text style={styles.title}>Sign In To Rep Coach</Text>
            <Text style={styles.subtitle}>Let's personalize your fitness</Text>
          </View>

          <View style={styles.form}>
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
                    editable={!loading}
                    returnKeyType="next"
                  />
                )}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>
                {errors.email.message}
              </Text>
            )}

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
                    editable={!loading}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={!showPassword ? eye : eyeclose}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            {errors.password ? (
              <Text style={styles.errorText}>
                {errors.password.message}
              </Text>
            ) : null}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton} disabled={loading}>
                <Image source={google} style={styles.socialIcon} />
              </TouchableOpacity>
              {isIOS && (
                <TouchableOpacity style={styles.socialButton} disabled={loading}>
                  <Image source={apple} style={styles.socialIcon} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate('Register')}>
                  Sign Up
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              disabled={loading}
            >
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
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

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // or your background color
  },

  // Add scrollContainer style for ScrollView contentContainerStyle
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp('2'), // Add some bottom padding
  },

  // Add consistent errorText style
  errorText: {
    color: 'red',
    marginTop: hp('0.5'),
    fontSize: 12,
  },

  // Ensure content takes proper space
  content: {
    flex: 1,
    paddingHorizontal: wp('5'), // Adjust as needed
    justifyContent: 'center', // Center content vertically if needed
  },

  // Make sure form has proper spacing
  form: {
    flex: 1,
    justifyContent: 'center', // Center form content
  },

  // Ensure loader overlay covers entire screen
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
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
    resizeMode: 'contain',
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