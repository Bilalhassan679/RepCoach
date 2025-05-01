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
import { hp, wp } from '../../theme/responsive';
import { colors } from '../../theme/colors';
import { scale, typography } from '../../theme/typography';
import { dragdays, dragmonth } from '../../assets';
type Props = NativeStackScreenProps<RootStackParamList, 'ExerciseFrequency'>;

const { width } = Dimensions.get('window');
const CIRCLE_RADIUS = width * 0.35;
const KNOB_SIZE = 40;

const ExerciseFrequencyScreen: React.FC<Props> = ({ navigation }) => {
  const [frequency, setFrequency] = useState(5);
  const rotation = useSharedValue(0);
  const { completeAssessment } = useAuth();

  const calculateDays = (angle: number) => {
    const normalizedAngle = ((angle % 360) + 360) % 360;
    return Math.max(1, Math.min(7, Math.round((normalizedAngle / 360) * 7)));
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startRotation = rotation.value;
    },
    onActive: (event, ctx) => {
      const angle = Math.atan2(event.y, event.x) * (180 / Math.PI);
      rotation.value = ctx.startRotation + angle;
      const days = calculateDays(rotation.value);
      runOnJS(setFrequency)(days);
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

  const handleNext = () => {
    // Mark assessment as complete and navigate to main
    navigation.navigate('WorkoutDuration');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.stepIndicator}> 
          <Text style={styles.stepText}>Step 5/6</Text>
          <Text style={styles.progressText}>5 of 6</Text>
        </View>
        <Text style={styles.title}>How many days a week do you typically exercise?</Text>

        <View style={styles.sliderContainer}>
          {/* <Svg width={width} height={width}>
            <Circle
              cx={width / 2}
              cy={width / 2}
              r={CIRCLE_RADIUS}
              stroke="#E0E0E0"
              strokeWidth={2}
              fill="none"
            />
            <Path
              d={`M ${width / 2} ${width / 2 - CIRCLE_RADIUS} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 1 ${width / 2 + CIRCLE_RADIUS} ${width / 2}`}
              stroke="#FF0000"
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
          <Image source={dragmonth} style={styles.frequencyImage} />  
          <View style={styles.frequencyContainer}>
            <Text style={styles.frequencyNumber}>{frequency}</Text>
            <Text style={styles.frequencyLabel}>Days</Text>
          </View>
          <Text style={styles.frequencyText}>
            I'm committed to exercising {frequency}x weekly
          </Text>
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
    backgroundColor: '#FFFFFF',
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
    fontSize: scale(14),
    color: 'rgba(17, 18, 20, 1)',
    marginBottom: 8,
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  title: {
    fontSize: scale(30),
    textAlign: 'center',
    color: colors.text,
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  frequencyImage: {
    width: wp('90'),
    height: hp('40'),
    marginTop:hp('5'),
    resizeMode: 'contain',
  
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: '#FF0000',
    position: 'absolute',
    marginLeft: -KNOB_SIZE / 2,
    marginTop: -KNOB_SIZE / 2,
  },
  frequencyContainer: {
    position: 'absolute',
    alignItems: 'center',
    right: wp('0'),
    bottom: hp('6'),
  },
  frequencyNumber: {
    fontSize: scale(150),
    color: colors.text,
    fontFamily: typography.fontFamily.WorkSansExtraBold,
  },
  frequencyLabel: {
    fontSize: scale(20),
    color: colors.text,
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  frequencyText: {
    fontSize: scale(16),
    color: colors.text,
    marginTop: 32,
    textAlign: 'center',
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExerciseFrequencyScreen; 