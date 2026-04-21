import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { scale } from '../../theme/typography';
import { hp, wp } from '../../theme/responsive';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { sms, profile, calendar } from '../../assets';
import { useUserInfoMutation } from '../../hooks/useUserInfoMutation';
import { ActivityIndicator } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'InformationGathering'>;

const InformationGatheringScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    dateOfJoin: '',
    email: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { mutate: updateUserInfo, isPending } = useUserInfoMutation();

  const parseDate = (dateStr: string) => {
    // Converts DD/MM/YYYY to YYYY-MM-DD for backend
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  const handleNext = () => {
    updateUserInfo({
      dob: parseDate(formData.dateOfBirth),
      joining_date: parseDate(formData.dateOfJoin),
      // email and fullName are usually already set during registration, 
      // but they can be passed here if the backend supports updating them via /user/info
    }, {
      onSuccess: () => {
        navigation.navigate('GymType');
      }
    });
  };

  const isFormValid = () => {
    return formData.fullName.trim() !== '' &&
      formData.dateOfBirth.trim() !== '' &&
      formData.dateOfJoin.trim() !== '' &&
      formData.email.trim() !== '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.stepIndicator}>
                <Text style={styles.stepText}>Step 1/5</Text>
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>1 of 6</Text>
                </View>
              </View>

              <Text style={styles.title}>Information Gathering</Text>
              <Text style={styles.subtitle}>Please provide the following information to help us tailor your experience</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper,
                  focusedField === 'fullName' && styles.inputWrapperFocused
                ]}>
                  <Image source={profile} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={formData.fullName}
                    onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                    placeholder="Enter your full name"
                    placeholderTextColor="rgba(17, 18, 20, 0.5)"
                    autoCapitalize="words"
                    returnKeyType="next"
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper,
                  focusedField === 'dateOfBirth' && styles.inputWrapperFocused
                ]}>
                  <Image source={calendar} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={formData.dateOfBirth}
                    onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
                    placeholder="Date of Birth"
                    placeholderTextColor="rgba(17, 18, 20, 0.5)"
                    keyboardType="numeric"
                    returnKeyType="next"
                    onFocus={() => setFocusedField('dateOfBirth')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper,
                  focusedField === 'dateOfJoin' && styles.inputWrapperFocused
                ]}>
                  <Image source={calendar} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={formData.dateOfJoin}
                    onChangeText={(text) => setFormData({ ...formData, dateOfJoin: text })}
                    placeholder="Date of Join Repcoach"
                    placeholderTextColor="rgba(17, 18, 20, 0.5)"
                    keyboardType="numeric"
                    returnKeyType="next"
                    onFocus={() => setFocusedField('dateOfJoin')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>

              {/* <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper,
                  focusedField === 'email' && styles.inputWrapperFocused
                ]}>
                  <Image source={sms} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    placeholder="Enter your email address"
                    placeholderTextColor="rgba(17, 18, 20, 0.5)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="done"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View> */}
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              !isFormValid() && styles.buttonDisabled
            ]}
            onPress={handleNext}
            disabled={!isFormValid() || isPending}
            activeOpacity={0.8}
          >
            {isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={[
                styles.buttonText,
                !isFormValid() && styles.buttonTextDisabled
              ]}>
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp('12'), // Space for button
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('5'),
    paddingTop: hp('2'),
  },
  header: {
    marginBottom: hp('4'),
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3'),
  },
  stepText: {
    fontSize: scale(16),
    color: 'rgba(17, 18, 20, 0.7)',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  progressContainer: {
    backgroundColor: 'rgba(239, 0, 0, 0.1)',
    paddingHorizontal: wp('3'),
    paddingVertical: hp('1'),
    borderRadius: 10,
  },
  progressText: {
    fontSize: scale(12),
    color: '#FF0000',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  title: {
    fontSize: scale(28),
    color: 'rgba(17, 18, 20, 1)',
    fontFamily: typography.fontFamily.WorkSansBold,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: scale(16),
    color: 'rgba(17, 18, 20, 0.6)',
    fontFamily: typography.fontFamily.WorkSansRegular,
    lineHeight: 22,
  },
  form: {
    gap: hp('2.5'),
  },
  inputContainer: {
    marginBottom: hp('1'),
  },
  inputLabel: {
    fontSize: scale(14),
    color: 'rgba(17, 18, 20, 0.8)',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
    marginBottom: hp('1'),
    marginLeft: wp('1'),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(224, 224, 224, 0.8)',
    borderRadius: 16,
    height: hp('7'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    width: wp('5'),
    height: wp('5'),
    resizeMode: 'contain',
    marginLeft: wp('4'),
    marginRight: wp('3'),
    tintColor: colors.primary.main,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: scale(16),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansRegular,
    paddingRight: wp('4'),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp('5'),
    paddingTop: hp('2'),
    borderTopWidth: 1,
    borderTopColor: 'rgba(224, 224, 224, 0.3)',
  },
  button: {
    backgroundColor: '#FF0000',
    height: hp('7'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF0000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(224, 224, 224, 0.6)',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
    letterSpacing: 0.5,
  },
  buttonTextDisabled: {
    color: 'rgba(17, 18, 20, 0.4)',
  },
});

export default InformationGatheringScreen;