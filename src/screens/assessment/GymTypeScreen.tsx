import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp } from '../../theme/responsive';
import { scale, typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'GymType'>;

const GymTypeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedGym, setSelectedGym] = useState<string>('');

  const gymTypes = [
    'Home',
    'Big Gym',
    'Small Gym',
    'CrossFit',
    'Performance Style',
    'Outdoors',
  ];

  const RadioButton = ({ selected }: { selected: boolean }) => (
    <View style={[styles.radio, selected && styles.radioSelected]} />
  );

  const handleNext = () => {
    navigation.navigate('GymEquipment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
      <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 1/5</Text>
          <Text style={styles.progressText}>2 of 6</Text>
        </View>
        <Text style={styles.title}>Gym Type</Text>

        <View style={styles.optionsContainer}>
          {gymTypes.map((gym) => (
            <TouchableOpacity
              key={gym}
              style={styles.option}
              onPress={() => setSelectedGym(gym)}
            >
              <Text style={styles.optionText}>{gym}</Text>
              <RadioButton selected={selectedGym === gym} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, !selectedGym && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!selectedGym}
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
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressText: {
    fontSize: scale(14),
    color: colors.primary.main,

    backgroundColor: 'rgba(239, 0, 0, 0.05)',
    paddingHorizontal: hp('1.5'),
    paddingVertical: hp('1'),
    borderRadius: 12,
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  stepText: {
    fontSize: scale(16),
    color: 'rgba(17, 18, 20, 1)',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  title: {
    fontSize: scale(30),
    marginBottom: 32,
    textAlign: 'center',
    color: colors.primary.main,
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  optionsContainer: {
    gap: 16,
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
    fontSize: scale(20),
    color: colors.text,
    fontFamily: typography.fontFamily.WorkSansMedium,
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

export default GymTypeScreen; 