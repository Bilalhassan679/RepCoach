import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { wp } from '../../theme/responsive';
import { scale, typography } from '../../theme/typography';
import Svg, { Line, Circle } from 'react-native-svg';

const DURATION_OPTIONS = [ 60, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,];
const CIRCLE_SIZE = wp('80');
const CENTER = CIRCLE_SIZE / 2;
const RADIUS = CIRCLE_SIZE / 2 - 32;

const getAngle = (index: number, total: number) =>
  (index / total) * 2 * Math.PI - Math.PI / 2;

// Helper to get x, y for a given angle and radius
const getXY = (angle: number, radius: number) => ({
  x: CENTER + Math.cos(angle) * radius,
  y: CENTER + Math.sin(angle) * radius,
});

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WorkoutDurationScreen'>;
};

const WorkoutDurationScreen = ({ navigation }: Props) => {
  const [selectedDuration, setSelectedDuration] = useState(45);

  const handleContinue = () => {
    navigation.navigate('GoalsAndProgramInterest');
  };

  // Find selected index and angle
  const selectedIndex = DURATION_OPTIONS.indexOf(selectedDuration);
  const angle = getAngle(selectedIndex, DURATION_OPTIONS.length);
  const handEnd = getXY(angle, RADIUS);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 1/5</Text>
          <Text style={styles.progressText}>6 of 6</Text>
        </View>
        <Text style={styles.title}>Workout Duration</Text>
        {/* Circular Duration Selector */}
        <View style={styles.dialContainer}>
          <View style={[styles.dial, { width: CIRCLE_SIZE, height: CIRCLE_SIZE }]}> 
            {/* SVG for the red hand */}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
                {/* Red hand */}
                <Line
                  x1={CENTER}
                  y1={CENTER}
                  x2={handEnd.x}
                  y2={handEnd.y}
                  stroke={colors.primary.main}
                  strokeWidth={4}
                  strokeLinecap="round"
                />
                {/* Center red dot */}
                <Circle
                  cx={CENTER}
                  cy={CENTER}
                  r={7}
                  fill={colors.primary.main}
                />
              </Svg>
            </View>
            {/* Numbers around the dial */}
            {DURATION_OPTIONS.map((duration, i) => {
              const ang = getAngle(i, DURATION_OPTIONS.length);
              const { x, y } = getXY(ang, RADIUS);
              const isSelected = selectedDuration === duration;
              return (
                <TouchableOpacity
                  key={duration}
                  style={[styles.dialNumberWrap, { left: x - 18, top: y - 18 }]}
                  onPress={() => setSelectedDuration(duration)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.dialNumber, isSelected && styles.dialNumberSelected]}>
                    <Text style={[styles.dialNumberText, isSelected && styles.dialNumberTextSelected]}>{duration}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* Large Number and Label */}
        <View style={styles.durationContainer}>
          <Text style={styles.durationNumber}>{selectedDuration}</Text>
          <Text style={styles.durationLabel}>Minutes</Text>
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
    marginBottom: 8,
  },
  stepText: { fontSize: scale(14), color: colors.neutral.black, fontFamily: typography.fontFamily.WorkSansBold },
  progressText: {
    fontSize: scale(14),
    color: colors.primary.main,
    backgroundColor: 'rgba(239, 0, 0, 0.05)',
    paddingHorizontal: wp('3'),
    paddingVertical: wp('1.5'),
    borderRadius: wp('3'),
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  title: {
    fontSize: scale(28),
    color: colors.neutral.black,
    fontFamily: typography.fontFamily.WorkSansBold,
    textAlign: 'center',
    marginVertical: 16,
  },
  dialContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dial: {
    backgroundColor: colors.neutral.black,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dialNumberWrap: {
    position: 'absolute',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  dialNumberSelected: {
    backgroundColor: colors.primary.main,
  },
  dialNumberText: {
    color: colors.neutral.white,
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  dialNumberTextSelected: {
    color: colors.neutral.white,
    fontWeight: 'bold',
  },
  durationContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  durationNumber: {
    fontSize: scale(100),
    color: colors.neutral.black,
    fontFamily: typography.fontFamily.WorkSansExtraBold,
  },
  durationLabel: {
    fontSize: scale(20),
    color: colors.neutral.black,
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  button: {
    backgroundColor: '#FF0000',
    height: wp('14'),
    borderRadius: wp('2'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: colors.neutral.white,
    fontSize: scale(16),
    fontWeight: '700',
    fontFamily: typography.fontFamily.WorkSansBold,
  },
});

export default WorkoutDurationScreen; 