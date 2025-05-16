import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { wp } from '../../theme/responsive';
import { scale, typography } from '../../theme/typography';
const DAY_OPTIONS = [1, 2, 3, 4, 5, 6];

// Type for navigation prop
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ExerciseFrequency'>;
};

const ExerciseFrequencyScreen = ({ navigation }: Props) => {
  const [selectedDay, setSelectedDay] = useState(4);

  const handleContinue = () => {
    navigation.navigate('WorkoutDurationScreen');
  };

  const renderDayButton = ({ item: day }: { item: number }) => {
    const isSelected = day <= selectedDay;
    return (
      <TouchableOpacity
        style={[
          styles.dayButton,
          isSelected ? styles.dayButtonSelected : styles.dayButtonUnselected,
        ]}
        onPress={() => setSelectedDay(day)}
        activeOpacity={0.8}
      >
        <View style={styles.dayButtonContent}>
          <Text style={[styles.dayButtonNumber, isSelected ? styles.dayButtonTextSelected : styles.dayButtonTextUnselected]}>{day}</Text>
          <Text style={[styles.dayButtonLabel, isSelected ? styles.dayButtonTextSelected : styles.dayButtonTextUnselected]}>day</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 5/6</Text>
          <Text style={styles.progressText}>5 of 6</Text>
        </View>

        {/* Day Selection Row with FlatList */}
        <FlatList
          data={DAY_OPTIONS}
          renderItem={renderDayButton}
          keyExtractor={item => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRow}
        />
        <View style={{marginBottom:wp('30')}}>
        {/* Large Number and Label */}
        <View style={styles.frequencyContainer}>
          <Text style={styles.frequencyNumber}>{selectedDay}</Text>
          <Text style={styles.frequencyLabel}>Days</Text>
        </View>

        {/* Commitment Text */}
        <Text style={styles.frequencyText}>
          I'm committed to exercising 
          <Text style={{fontFamily:typography.fontFamily.WorkSansBold}}> {selectedDay}x </Text>weekly
        </Text>
        </View>
        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neutral.white },
  content: { flex: 1, padding: 20 },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepText: { fontSize: scale(14), color: colors.neutral.black, fontFamily:typography.fontFamily.WorkSansBold },
  progressText: {
    fontSize: scale(14),
    color: colors.primary.main,
    backgroundColor: 'rgba(239, 0, 0, 0.05)',
    paddingHorizontal: wp('3'),
    paddingVertical: wp('1.5'),
    borderRadius: wp('3'),
    fontFamily:typography.fontFamily.WorkSansBold
  },
  daysRow: {
    marginTop: wp('40'),
  },
  dayButton: {
    borderRadius: 12,
    paddingVertical: wp('5'),
    paddingHorizontal: wp('3.5'),
    marginHorizontal: wp('1'),
    borderWidth: 1.5,
    height: wp('18'),
  },
  dayButtonSelected: {
    backgroundColor: colors.neutral.black,
    borderColor: colors.neutral.black,
  },
  dayButtonUnselected: {
    backgroundColor: colors.neutral.white,
    borderColor: colors.neutral.grey300,
  },
  dayButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayButtonNumber: {
    fontSize: scale(20),
    fontFamily:typography.fontFamily.WorkSansBold
  },
  dayButtonLabel: {
    fontSize: scale(13),
    fontFamily:typography.fontFamily.WorkSansRegular,
    marginTop: 2,
  },
  dayButtonTextSelected: {
    color: colors.neutral.white,
  },
  dayButtonTextUnselected: {
    color: colors.neutral.grey500,
  },
  frequencyContainer: {
    alignItems: 'center',
  },
  frequencyNumber: {
    fontSize: scale(100),
    color: colors.neutral.black,
    fontFamily:typography.fontFamily.WorkSansExtraBold
  },
  frequencyLabel: {
    fontSize: scale(20),
    color: colors.neutral.black,
    fontFamily:typography.fontFamily.WorkSansBold
  },
  frequencyText: {
    fontSize: scale(16),
    color: colors.neutral.black,
    marginTop: wp('15'),
    textAlign: 'center',
    fontWeight: '400',
    fontFamily:typography.fontFamily.WorkSansRegular
  },
  button: {
    backgroundColor: '#FF0000',
    height: wp('14'),
    borderRadius: wp('2'),
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonText: {
    color: colors.neutral.white,
    fontSize: scale(16),
    fontWeight: '700',
    fontFamily:typography.fontFamily.WorkSansBold
  },
});

export default ExerciseFrequencyScreen; 