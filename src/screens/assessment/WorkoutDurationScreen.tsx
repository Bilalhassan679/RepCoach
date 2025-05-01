import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import Svg, { Path, Circle } from 'react-native-svg';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';
import StepIndicator from '../../components/StepIndicator';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { scale } from '../../theme/typography';
import { hp, wp } from '../../theme/responsive';
import { dragdays, dragmonth } from '../../assets';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutDuration'>;

const { width } = Dimensions.get('window');
const CIRCLE_RADIUS = width * 0.35;
const KNOB_SIZE = 40;
const MIN_DURATION = 15;
const MAX_DURATION = 120;
const STEP = 5; // Duration will increment/decrement by 5 minutes

const WorkoutDurationScreen: React.FC<Props> = ({ navigation }) => {
  const [duration, setDuration] = useState(45);
  const rotation = useSharedValue(0);
  const { completeAssessment } = useAuth();

  const calculateDuration = (angle: number) => {
    const normalizedAngle = ((angle % 360) + 360) % 360;
    const percentage = normalizedAngle / 360;
    const range = MAX_DURATION - MIN_DURATION;
    const rawDuration = MIN_DURATION + (percentage * range);
    // Round to nearest step
    return Math.round(rawDuration / STEP) * STEP;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startRotation = rotation.value;
    },
    onActive: (event, ctx) => {
      const angle = Math.atan2(event.y, event.x) * (180 / Math.PI);
      rotation.value = ctx.startRotation + angle;
      const minutes = calculateDuration(rotation.value);
      runOnJS(setDuration)(minutes);
    },
  });

  const knobStyle = useAnimatedStyle(() => {
    const angle = rotation.value;
    const x = Math.cos(angle * (Math.PI / 180)) * CIRCLE_RADIUS;
    const y = Math.sin(angle * (Math.PI / 180)) * CIRCLE_RADIUS;
    return {
      transform: [
        { translateX: x },
        { translateY: y },
      ],
    };
  });

  // Calculate the progress arc path based on the current duration
  const getProgressArcPath = () => {
    const percentage = (duration - MIN_DURATION) / (MAX_DURATION - MIN_DURATION);
    const angle = percentage * 180; // We're using a half circle (180 degrees)
    const endX = width / 2 + CIRCLE_RADIUS * Math.cos((angle - 90) * (Math.PI / 180));
    const endY = width / 2 + CIRCLE_RADIUS * Math.sin((angle - 90) * (Math.PI / 180));
    return `M ${width / 2} ${width / 2 - CIRCLE_RADIUS} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 ${angle > 180 ? 1 : 0} 1 ${endX} ${endY}`;
  };

  const handleNext = () => {
    // Mark assessment as complete and navigate to main app
    completeAssessment();
    navigation.navigate('MainApp', { screen: 'Home' });
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
        <View style={styles.stepIndicator}> 
          <Text style={styles.stepText}>Step 6/6</Text>
          <Text style={styles.progressText}>6 of 6</Text>
        </View>
        <Text style={styles.title}>How long do you typically work out?</Text>
        <View style={styles.sliderContainer}>
          {/* <Svg width={width} height={width}>
            <Circle
              cx={width / 2}
              cy={width / 2}
              r={CIRCLE_RADIUS}
              stroke={colors.neutral.grey200}
              strokeWidth={2}
              fill="none"
            />
            <Path
              d={getProgressArcPath()}
              stroke={colors.primary.main}
              strokeWidth={4}
              fill="none"
            />
            <PanGestureHandler onGestureEvent={gestureHandler}>
              <Animated.View
                style={[
                  styles.knob,
                  knobStyle,
                  { transform: [{ translateX: width / 2 }, { translateY: width / 2 }] },
                ]}
              />
            </PanGestureHandler>
          </Svg> */}
          <Image source={dragdays} style={styles.frequencyImage} />
          <View style={styles.durationContainer}>
            <Text style={styles.durationNumber}>{duration}</Text>
            <Text style={styles.durationLabel}>Minutes</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
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
  stepText: {
    fontSize: scale(14),
    color: colors.primary.main,
    marginBottom: 8,
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
  frequencyImage: {
    width: wp('100'),
    height: hp('45'),
    marginTop:hp('5'),
    resizeMode: 'contain',
  
  },
  
  title: {
    fontSize: scale(30),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: colors.primary.main,
    position: 'absolute',
    marginLeft: -KNOB_SIZE / 2,
    marginTop: -KNOB_SIZE / 2,
  },
  durationContainer: {
    position: 'absolute',
    alignItems: 'center',
    right: wp('-2'),
    bottom: hp('-1'),

  },
  durationNumber: {
    fontSize: scale(150),
    color: colors.text,
    fontFamily: typography.fontFamily.WorkSansExtraBold,
  },
  durationLabel: {
    fontSize: scale(20),
    color: colors.text,
    fontFamily: typography.fontFamily.WorkSansBold,
    textAlign:'right',
    backgroundColor:'red',
  },
  button: {
    backgroundColor: colors.primary.main,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: colors.primary.contrast,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WorkoutDurationScreen; 