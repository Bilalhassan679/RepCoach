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

type Props = NativeStackScreenProps<RootStackParamList, 'DataReview3'>;

const DataReview3: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    stretchAssessment: '7',
    painScore: 'Yes',
    postStretchScore: '50 seconds',
    heartRate: '95 bpm',
    recoveryTime: '05:00 minutes',
    exerciseType: 'Chest Press',
    weightUsed: '25 kilograms',
    repsCompleted: '4 x 10',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    navigation.navigate('Confirmation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.stepContainer}>
            <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 4/5</Text>
          <Text style={styles.progressText}>3 of 3</Text>
        </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '100%' }]} />
              </View>
            </View>
          </View>

          <Text style={styles.title}>Data Review and{'\n'}Confirmation</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Stretch Assessment</Text>
              <TextInput
                style={styles.input}
                value={formData.stretchAssessment}
                onChangeText={(value) => handleInputChange('stretchAssessment', value)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pain Score</Text>
              <TextInput
                style={styles.input}
                value={formData.painScore}
                onChangeText={(value) => handleInputChange('painScore', value)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Post-Stretch Score</Text>
            <TextInput
              style={styles.input}
              value={formData.postStretchScore}
              onChangeText={(value) => handleInputChange('postStretchScore', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Heart Rate Conditioning Assessment</Text>
            <TextInput
              style={styles.input}
              value={formData.heartRate}
              onChangeText={(value) => handleInputChange('heartRate', value)}
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Recovery Time</Text>
              <TextInput
                style={styles.input}
                value={formData.recoveryTime}
                onChangeText={(value) => handleInputChange('recoveryTime', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Exercise Type</Text>
              <TextInput
                style={styles.input}
                value={formData.exerciseType}
                onChangeText={(value) => handleInputChange('exerciseType', value)}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Weight Used</Text>
              <TextInput
                style={styles.input}
                value={formData.weightUsed}
                onChangeText={(value) => handleInputChange('weightUsed', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reps Completed</Text>
              <TextInput
                style={styles.input}
                value={formData.repsCompleted}
                onChangeText={(value) => handleInputChange('repsCompleted', value)}
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
    paddingTop: hp(1),
  },
  stepContainer: {
    paddingHorizontal: wp(5),
    marginBottom: hp(3),
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
  title: {
    fontSize: scale(30),
    textAlign: 'center',
    color: '#000000',
    fontFamily: typography.fontFamily.WorkSansBold,
    lineHeight: scale(32),
    paddingHorizontal: wp(5),
  },
  formContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(4),
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    fontSize: scale(14),
    color: '#000000',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
    marginBottom: hp(1),
    marginTop: hp('2'),
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
  button: {
    backgroundColor: '#FF0000',
    height: hp(6),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"flex-end",
    width:wp('40'),
    marginTop: hp('2'),
    marginRight: wp('5'),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
});

export default DataReview3; 