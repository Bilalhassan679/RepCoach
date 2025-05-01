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

type Props = NativeStackScreenProps<RootStackParamList, 'DataReview2'>;

const DataReview2: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    programInterest: 'Corrective Exercise',
    injuryHistory: 'past injuries here...',
    surgeries: 'Cataract, Cholecystectomy, Appendectomy',
    healthIssues: 'Meningitis, Common cold, Measles, HIV/AIDS',
    bodyWeightGoals: '75 kg',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    navigation.navigate('DataReview3');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.stepContainer}>
    

            <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 4/5</Text>
          <Text style={styles.progressText}>2 of 3</Text>
        </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '66%' }]} />
              </View>
            </View>
          </View>

          <Text style={styles.title}>Data Review and{'\n'}Confirmation</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Goals and Program Interest</Text>
            <TextInput
              style={styles.input}
              value={formData.programInterest}
              onChangeText={(value) => handleInputChange('programInterest', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Injury History</Text>
            <TextInput
              style={[styles.input,]}
              value={formData.injuryHistory}
              onChangeText={(value) => handleInputChange('injuryHistory', value)}
              placeholderTextColor="#666666"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Surgeries</Text>
            <TextInput
              style={styles.input}
              value={formData.surgeries}
              onChangeText={(value) => handleInputChange('surgeries', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Diseases/Health Issues</Text>
            <TextInput
              style={styles.input}
              value={formData.healthIssues}
              onChangeText={(value) => handleInputChange('healthIssues', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Body Weight Goals</Text>
            <TextInput
              style={styles.input}
              value={formData.bodyWeightGoals}
              onChangeText={(value) => handleInputChange('bodyWeightGoals', value)}
              keyboardType="numeric"
            />
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
  inputGroup: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: scale(14),
    color: '#000000',
    fontFamily: typography.fontFamily.WorkSansBold,
    marginBottom: hp('1'),
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
    marginHorizontal: wp(5),
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
});

export default DataReview2; 