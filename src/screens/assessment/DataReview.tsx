import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp, wp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'DataReview'>;

const DataReview: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    email: '',
    gymType: '',
    employmentType: '',
    gymEquipment: '',
    trainingFrequency: '',
    workoutDuration: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    navigation.navigate('DataReview2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 4/5</Text>
          <Text style={styles.progressText}>1 of 3</Text>
        </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '33%' }]} />
            </View>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Data Review and{'\n'}Confirmation</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.rowContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Your Full Name"
                placeholderTextColor="#666666"
                value={formData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="11 sept 2024"
                placeholderTextColor="#666666"
                value={formData.dateOfBirth}
                onChangeText={(value) => handleInputChange('dateOfBirth', value)}
              />
            </View>
          </View>


          <View style={styles.inputContainer}>

            <TextInput
              style={styles.input}
              placeholder="elementaryname@yourmail.com"
              placeholderTextColor="#666666"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>Gym Type</Text>

              <TextInput
                style={styles.input}
                placeholder="Gym Type"
                placeholderTextColor="#666666"
                value={formData.gymType}
                onChangeText={(value) => handleInputChange('gymType', value)}
              />
            </View>
            <View style={[styles.inputContainer, styles.activeInput]}>
          <Text style={styles.sectionTitle}>Employment Type</Text>

              <TextInput
                style={[styles.input, styles.activeInputText]}
                placeholder="Employment Type"
                placeholderTextColor="#666666"
                onChangeText={(value) => handleInputChange('employmentType', value)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>Gym Equipment</Text>
            <TextInput
              style={styles.input}
              placeholder="Treadmill, Barbell, Dumbbell, Bench"
              placeholderTextColor="#666666"
              onChangeText={(value) => handleInputChange('gymEquipment', value)}
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>Training Frequency</Text>

              <TextInput
                style={styles.input}
                placeholder="Training Frequency"
                placeholderTextColor="#666666"
                value="5x"
                onChangeText={(value) => handleInputChange('trainingFrequency', value)}
              />
            </View>
            <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>Workout Duration</Text>
              <TextInput
                style={styles.input}
                placeholder="Workout Duration"
                placeholderTextColor="#666666"
                value="45 minutes"
                onChangeText={(value) => handleInputChange('workoutDuration', value)}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(3),
  },
  title: {
    fontSize: scale(30),
    textAlign: 'center',
    color: '#000000',
    fontFamily: typography.fontFamily.WorkSansBold,
    lineHeight: scale(32),
  },
  formContainer: {
    paddingHorizontal: wp(5),
  },
  sectionTitle: {
    fontSize: scale(14),
    color: '#000000',
    fontFamily: typography.fontFamily.WorkSansBold,
    marginBottom: hp('1'),
    marginTop: hp('2'),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  inputContainer: {
    flex: 1,
    marginRight: wp(2),
  },
  input: {
    height: hp(6),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: wp(4),
    fontSize: scale(14),
    fontFamily: typography.fontFamily.WorkSansRegular,
    color: '#000000',
  },
  activeInput: {
    borderColor: '#007AFF',
  },
  activeInputText: {
    color: '#007AFF',
  },
  button: {
    backgroundColor: '#FF0000',
    height: hp(6),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginVertical: hp(3),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  stepContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  stepText: {
    fontSize: scale(16),
    color: 'rgba(17, 18, 20, 1)',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  progressText: {
    fontSize: scale(14),
    color: colors.primary.main,
    backgroundColor: 'rgba(239, 0, 0, 0.05)',
    paddingHorizontal: hp('1.5'),
    paddingVertical: hp('1'),
    borderRadius: 12,
    fontFamily: typography.fontFamily.WorkSansSemiBold,
    marginBottom: 8,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageIndicator: {
    fontSize: scale(12),
    color: '#FF0000',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  progressBarContainer: {
    height: hp(0.6),
    backgroundColor: '#FFE5E5',
    borderRadius: hp(0.3),
    overflow: 'hidden',
  },
  progressBar: {
    flex: 1,
    borderRadius: hp(0.3),
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF0000',
    borderRadius: hp(0.3),
  },
});

export default DataReview; 