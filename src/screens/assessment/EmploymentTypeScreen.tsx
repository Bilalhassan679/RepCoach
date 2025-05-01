import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { scale, typography } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { hp } from '../../theme/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'EmploymentType'>;

const EmploymentTypeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');

  const employmentTypes = [
    'Standing',
    'Sitting',
  ];

  const RadioButton = ({ selected }: { selected: boolean }) => (
    <View style={[styles.radio, selected && styles.radioSelected]} />
  );

  const handleNext = () => {
    navigation.navigate('ExerciseFrequency');

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 4/6</Text>
          <Text style={styles.progressText}>4 of 6</Text>
        </View>
        <Text style={styles.title}>Employment Type</Text>

        <View style={styles.optionsContainer}>
          {employmentTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.option}
              onPress={() => setSelectedType(type)}
            >
              <Text style={styles.optionText}>{type}</Text>
              <RadioButton selected={selectedType === type} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Specify your career/job title.</Text>
          <TextInput
            style={styles.input}
            value={jobTitle}
            onChangeText={setJobTitle}
            placeholder="Enter your job title"
            multiline
          />
          <Text style={styles.counter}>{jobTitle.length}/50</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, (!selectedType || !jobTitle) && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!selectedType || !jobTitle}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
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
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  radioSelected: {
    borderColor: '#FF0000',
    borderWidth: 7,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#333333',
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  counter: {
    fontSize: 12,
    color: '#666666',
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: '#FF0000',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
  },
  buttonDisabled: {
    backgroundColor: '#FFD6D6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmploymentTypeScreen; 