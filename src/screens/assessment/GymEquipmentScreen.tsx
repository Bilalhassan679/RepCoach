import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp, wp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { document } from '../../assets';

type Props = NativeStackScreenProps<RootStackParamList, 'GymEquipment'>;

const MAX_EQUIPMENT = 10;

const GymEquipmentScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const defaultEquipment = [
    'Treadmill',
    'Dumbbell',
    'Bench',
    'Barbell',
    'Resistance Bands',
  ];

  const handleAddEquipment = () => {
    if (selectedEquipment.length >= MAX_EQUIPMENT) {
      Alert.alert(
        'Maximum Limit Reached',
        'You can only select up to 10 equipment items.',
        [{ text: 'OK' }]
      );
      setInputValue('');
      return;
    }

    if (inputValue.trim() && !selectedEquipment.includes(inputValue.trim())) {
      setSelectedEquipment([...selectedEquipment, inputValue.trim()]);
      setInputValue('');
    }
  };

  const toggleEquipment = (equipment: string) => {
    if (selectedEquipment.includes(equipment)) {
      setSelectedEquipment(selectedEquipment.filter(item => item !== equipment));
    } else if (selectedEquipment.length < MAX_EQUIPMENT) {
      setSelectedEquipment([...selectedEquipment, equipment]);
    } else {
      Alert.alert(
        'Maximum Limit Reached',
        'You can only select up to 10 equipment items.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleNext = () => {
    navigation.navigate('EmploymentType');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.stepIndicator}>   
          <Text style={styles.stepText}>Step 1/5</Text>
          <Text style={styles.progressText}>3 of 6</Text>
        </View>
        <Text style={styles.title}>Gym Equipment</Text>

        <View style={styles.card}>
          <View style={styles.optionsContainer}>
            
            {selectedEquipment
              .filter(item => !defaultEquipment.includes(item))
              .map((equipment) => (
                <TouchableOpacity
                  key={equipment}
                  style={[styles.option, styles.optionSelected]}
                  onPress={() => toggleEquipment(equipment)}
                >
                  <Text style={styles.optionTextSelected}>{equipment}</Text>
                </TouchableOpacity>
              ))}
          </View>

          <View style={styles.counterContainer}>
            <Image source={document} style={styles.icon} />
            <Text style={styles.counterText}>{selectedEquipment.length}/{MAX_EQUIPMENT}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              selectedEquipment.length >= MAX_EQUIPMENT && styles.inputDisabled
            ]}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={
              selectedEquipment.length >= MAX_EQUIPMENT
                ? "Maximum equipment limit reached"
                : "Type equipment and press enter..."
            }
            placeholderTextColor={selectedEquipment.length >= MAX_EQUIPMENT ? "#999" : "#666"}
            onSubmitEditing={handleAddEquipment}
            returnKeyType="done"
            editable={selectedEquipment.length < MAX_EQUIPMENT}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !selectedEquipment.length && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!selectedEquipment.length}
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
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
  },  
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: scale(30),
    marginBottom: 32,
    textAlign: 'center',
    color: colors.text,
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  inputDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  optionSelected: {
    backgroundColor: 'rgba(239, 0, 0, 0.05)',
  },
  optionText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  optionTextSelected: {
    fontSize: scale(14),
    color: colors.primary.main,
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 4,
  },
  counterText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: typography.fontFamily.WorkSansRegular,
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
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  icon: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
});

export default GymEquipmentScreen; 