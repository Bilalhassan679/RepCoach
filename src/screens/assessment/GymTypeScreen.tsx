import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp, wp } from '../../theme/responsive';
import { scale, typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'GymType'>;

const GymTypeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedGym, setSelectedGym] = useState<string>('');

  const gymTypes = [
    { id: 'home', name: 'Home', description: 'Workout from the comfort of your home' },
    { id: 'big-gym', name: 'Big Gym', description: 'Large commercial gym with full equipment' },
    { id: 'small-gym', name: 'Small Gym', description: 'Boutique gym with essential equipment' },
    { id: 'crossfit', name: 'CrossFit', description: 'High-intensity functional fitness' },
    { id: 'performance', name: 'Performance Style', description: 'Sport-specific training facility' },
    { id: 'outdoors', name: 'Outdoors', description: 'Outdoor fitness and training' },
  ];

  const RadioButton = ({ selected }: { selected: boolean }) => (
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  const handleNext = () => {
    navigation.navigate('GymEquipment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.stepIndicator}>
                <Text style={styles.stepText}>Step 1/5</Text>
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>2 of 6</Text>
                </View>
              </View>
              
              <Text style={styles.title}>Gym Type</Text>
              <Text style={styles.subtitle}>
                Select the type of gym or workout environment you prefer
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              {gymTypes.map((gym) => (
                <TouchableOpacity
                  key={gym.id}
                  style={[
                    styles.option,
                    selectedGym === gym.id && styles.optionSelected
                  ]}
                  onPress={() => setSelectedGym(gym.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionContent}>
                    <View style={styles.optionTextContainer}>
                      <Text style={[
                        styles.optionText,
                        selectedGym === gym.id && styles.optionTextSelected
                      ]}>
                        {gym.name}
                      </Text>
                      <Text style={[
                        styles.optionDescription,
                        selectedGym === gym.id && styles.optionDescriptionSelected
                      ]}>
                        {gym.description}
                      </Text>
                    </View>
                    <RadioButton selected={selectedGym === gym.id} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              !selectedGym && styles.buttonDisabled
            ]}
            onPress={handleNext}
            disabled={!selectedGym}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.buttonText,
              !selectedGym && styles.buttonTextDisabled
            ]}>
              Continue
            </Text>
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 0, 0, 0.2)',
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
    marginBottom: hp('1'),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scale(16),
    color: 'rgba(17, 18, 20, 0.6)',
    fontFamily: typography.fontFamily.WorkSansRegular,
    lineHeight: 22,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: hp('2'),
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(224, 224, 224, 0.8)',
    borderRadius: 16,
    padding: wp('4'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  optionSelected: {
    borderColor: '#FF0000',
    backgroundColor: 'rgba(255, 0, 0, 0.02)',
    shadowColor: '#FF0000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTextContainer: {
    flex: 1,
    marginRight: wp('3'),
  },
  optionText: {
    fontSize: scale(18),
    color: 'rgba(17, 18, 20, 1)',
    fontFamily: typography.fontFamily.WorkSansMedium,
    marginBottom: hp('0.5'),
  },
  optionTextSelected: {
    color: '#FF0000',
  },
  optionDescription: {
    fontSize: scale(14),
    color: 'rgba(17, 18, 20, 0.6)',
    fontFamily: typography.fontFamily.WorkSansRegular,
    lineHeight: 18,
  },
  optionDescriptionSelected: {
    color: 'rgba(255, 0, 0, 0.8)',
  },
  radio: {
    width: wp('6'),
    height: wp('6'),
    borderRadius: wp('3'),
    borderWidth: 2,
    borderColor: 'rgba(224, 224, 224, 1)',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#FF0000',
    borderWidth: 2,
  },
  radioInner: {
    width: wp('3'),
    height: wp('3'),
    borderRadius: wp('1.5'),
    backgroundColor: '#FF0000',
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

export default GymTypeScreen;