import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {hp, wp} from '../../theme/responsive';
import {scale} from '../../theme/typography';
import {typography} from '../../theme/typography';
import Svg, {Circle, Path} from 'react-native-svg';
import {heartrate} from '../../assets';

type Props = NativeStackScreenProps<RootStackParamList, 'HeartRateAssessment'>;

const HeartRateAssessmentScreen: React.FC<Props> = ({navigation}) => {
  const [heartRate] = useState(190);
  const [recoveryTime] = useState('00:00 Minutes');

  const handleContinue = () => {
    navigation.navigate('LiftingAssessment');
  };

  const renderCircularProgress = () => {
    const size = wp('50 ');
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = 0.75; // 75% progress
    const strokeDashoffset = circumference - progress * circumference;

    return (
      <View style={styles.circleContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FFE5E5"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FF0000"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-0 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.circleContent}>
          <View style={styles.heartIconContainer}>
            <Image source={heartrate} style={styles.heartIcon} />
          </View>
          <Text style={styles.heartRateText}>{heartRate}</Text>
          <Text style={styles.bpmText}>bpm</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>Step 3/5</Text>
            <Text style={styles.progressText}>2 of 3</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressFill, {width: '66%'}]} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>Heart Rate</Text>
      <Text style={styles.subtitle}>Conditioning Assessment</Text>

      <Text style={styles.title2}>Max Heart Rate</Text>

      <View style={styles.content}>
        {renderCircularProgress()}
        <Text style={styles.formulaText}>Based on the formula</Text>
        <Text
          style={{
            fontFamily: typography.fontFamily.WorkSansSemiBold,
            marginTop: hp(1),
            fontSize: scale(16),
          }}>
          (220 - Age)
        </Text>
      </View>
      <View style={styles.recoveryContainer}>
        <Text style={styles.recoveryTitle}>Recovery Time</Text>
        <View style={styles.recoveryInputContainer}>
          <Text style={styles.recoveryTimeText}>05:00 Minutes</Text>
        </View>
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
    fontSize: scale(32),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansBold,
    lineHeight: scale(40),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scale(25),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansBold,
    marginBottom: hp(4),
    textAlign: 'center',
  },
  title2: {
    fontSize: scale(16),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
    marginBottom: hp(2),
    marginTop: hp(2),
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  circleContainer: {
    position: 'relative',
    width: wp('50'),
    height: wp('50'),
    marginBottom: hp(3),
  },
  svg: {
    transform: [{rotate: '-90deg'}],
  },
  circleContent: {
    position: 'absolute',
    top: 0,
    left: wp('1'),
    right: 0,
    bottom: hp('3'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    width: wp('30'),
    height: wp('30'),
    resizeMode: 'contain',
    marginBottom: hp('-4'),
  },
  heartIconContainer: {},
  heartRateText: {
    fontSize: scale(40),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  bpmText: {
    fontSize: scale(14),
    color: '#666666',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  formulaText: {
    fontSize: scale(14),
    color: '#666666',
    fontFamily: typography.fontFamily.WorkSansMedium,
    textAlign: 'center',
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
  recoveryContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(248, 248, 248, 1)',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    marginBottom: hp(5),
  },
  recoveryTitle: {
    fontSize: scale(16),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  recoveryInputContainer: {
    height: hp(6),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
  },
  recoveryTimeText: {
    fontSize: scale(16),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
});

export default HeartRateAssessmentScreen;
