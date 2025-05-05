import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {hp, wp} from '../../theme/responsive';
import {scale} from '../../theme/typography';
import {typography} from '../../theme/typography';
import {Dropdown} from 'react-native-element-dropdown';

type Props = NativeStackScreenProps<RootStackParamList, 'LiftingAssessment'>;

interface DropdownItem {
  label: string;
  value: string | number;
}

const exerciseTypes: DropdownItem[] = [
  {label: 'Chest Press', value: 'chest_press'},
  {label: 'Shoulder Press', value: 'shoulder_press'},
  {label: 'Squat', value: 'squat'},
  {label: 'Deadlift', value: 'deadlift'},
];

const weightOptions: DropdownItem[] = Array.from({length: 40}, (_, i) => ({
  label: `${(i + 1) * 5} kilograms`,
  value: (i + 1) * 5,
}));

const repsOptions: DropdownItem[] = [
  {label: '4 x 10', value: '4x10'},
  {label: '3 x 12', value: '3x12'},
  {label: '5 x 5', value: '5x5'},
];

const LiftingAssessmentScreen: React.FC<Props> = ({navigation}) => {
  const [exerciseType, setExerciseType] = useState<string | null>(null);
  const [weightUsed, setWeightUsed] = useState<number | null>(null);
  const [repsCompleted, setRepsCompleted] = useState<string | null>(null);

  const handleContinue = () => {
    navigation.navigate('DataReview');
  };

  const renderDropdown = (
    label: string,
    value: string | number | null,
    setValue: (value: any) => void,
    data: DropdownItem[],
    placeholder: string,
  ) => {
    return (
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>{label}</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          onChange={(item: DropdownItem) => setValue(item.value)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>Step 4/5</Text>
            <Text style={styles.progressText}>3 of 3</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressFill, {width: '100%'}]} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>Lifting Assessment</Text>

      <View style={styles.content}>
        {renderDropdown(
          'Exercise Type',
          exerciseType,
          setExerciseType,
          exerciseTypes,
          'Select exercise type',
        )}
        {renderDropdown(
          'Weight Used',
          weightUsed,
          setWeightUsed,
          weightOptions,
          'Select weight',
        )}
        {renderDropdown(
          'Reps Completed',
          repsCompleted,
          setRepsCompleted,
          repsOptions,
          'Select reps',
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: hp(1),
  },
  stepContainer: {
    paddingHorizontal: wp(5),
    marginBottom: hp(3),
  },
  stepIndicator: {
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
    color: '#FF0000',
    backgroundColor: 'rgba(239, 0, 0, 0.05)',
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(1),
    borderRadius: 12,
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  progressBarContainer: {
    height: hp(0.6),
    backgroundColor: '#FFE5E5',
    borderRadius: hp(0.3),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF0000',
    borderRadius: hp(0.3),
  },
  title: {
    fontSize: scale(30),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansBold,
    lineHeight: scale(40),
    textAlign: 'center',
    marginBottom: hp(6),

  },
  subtitle: {
    fontSize: scale(25),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansBold,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  dropdownContainer: {
    marginBottom: hp(3),
  },
  dropdownLabel: {
    fontSize: scale(16),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
    marginBottom: hp(1),
  },
  dropdown: {
    height: hp(6),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: wp(4),
    backgroundColor: '#FFFFFF',
  },
  placeholderStyle: {
    fontSize: scale(16),
    color: '#666666',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  selectedTextStyle: {
    fontSize: scale(16),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  button: {
    backgroundColor: '#FF0000',
    marginHorizontal: wp(5),
    height: hp(6),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(4),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
});

export default LiftingAssessmentScreen; 