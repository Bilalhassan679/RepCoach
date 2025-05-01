import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp, wp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { typography } from '../../theme/typography';
import RangeSlider from 'crn-range-slider';
import Slider from '@react-native-community/slider';
import { poststretchbg } from '../../assets';

type Props = NativeStackScreenProps<RootStackParamList, 'PhysicalAssessment'>;

const PhysicalAssessmentScreen: React.FC<Props> = ({ navigation }) => {
  const [stretchScore, setStretchScore] = useState(7);
  const [hasPain, setHasPain] = useState(false);
  const [postStretchScore, setPostStretchScore] = useState(50);

  const handleStretchScoreChange = (low: number) => {
    setStretchScore(Math.round(low));
  };

  const handlePostStretchChange = (value: number) => {
    // Round to nearest 5
    const roundedValue = Math.round(value / 5) * 5;
    setPostStretchScore(roundedValue);
  };

  const handleContinue = () => {
    navigation.navigate('HeartRateAssessment');
  };

  const renderThumb = () => (
    <View style={styles.scoreCircle}>
      <Text style={styles.scoreText}>{stretchScore}</Text>
    </View>
  );

  const renderRail = () => <View style={styles.rail} />;
  const renderRailSelected = () => <View style={styles.railSelected} />;

  const renderPostStretchThumb = () => (
    <View style={styles.postStretchThumb} />
  );

  const renderPostStretchRail = () => {
    return (
      <View style={styles.postStretchRailContainer}>
        {Array.from({ length: 11 }, (_, i) => {
          const value = i * 5 + 10;
          const isLongMark = value % 10 === 0;
          return (
            <View key={value} style={styles.markContainer}>
              <View 
                style={[
                  styles.postStretchMark,
                  isLongMark && styles.postStretchLongMark,
                  value === postStretchScore && styles.postStretchActiveMark
                ]} 
              />
              {isLongMark && (
                <Text style={styles.postStretchMarkText}>{value}</Text>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderPostStretchRailSelected = () => (
    <View style={styles.postStretchRailSelected} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>Step 3/5</Text>
            <Text style={styles.progressText}>1 of 3</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressFill, { width: '33%' }]} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>Physical Assessments</Text>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Stretch Score</Text>
          <View style={styles.sliderContainer}>
            <RangeSlider
              style={styles.stretchSlider}
              min={1}
              max={10}
              step={1}
              floatingLabel={false}
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              low={stretchScore}
              high={10}
              disableRange={true}
              onValueChanged={handleStretchScoreChange}
            />
          </View>
        </View>


      
        <View style={[styles.section, {backgroundColor:'rgba(248, 248, 248, 1)',paddingVertical:hp(2)}]}>
        <Text style={styles.label}>Pain</Text>
          <View style={styles.painToggle}>
            <TouchableOpacity 
              style={[styles.toggleButton, hasPain && styles.activeToggle]}
              onPress={() => setHasPain(true)}
            >
              <Text style={[styles.toggleText, hasPain && styles.activeToggleText]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleButton, !hasPain && styles.activeToggle]}
              onPress={() => setHasPain(false)}
            >
              <Text style={[styles.toggleText, !hasPain && styles.activeToggleText]}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Post-Stretch Score</Text>
          <View style={styles.postStretchContainer}>
        
            {/* <View style={styles.postStretchSliderContainer}>
              <RangeSlider
                style={styles.postStretchSlider}
                min={10}
                max={60}
                step={5}
                floatingLabel={false}
                renderThumb={renderPostStretchThumb}
                renderRail={renderPostStretchRail}
                renderRailSelected={renderPostStretchRailSelected}
                low={postStretchScore}
                high={60}
                disableRange={true}
                onValueChanged={(low) => setPostStretchScore(Math.round(low))}
              />
            </View> */}
            <Image source={poststretchbg} style={styles.postStretchSlider} />
            <Text style={styles.postStretchValue}>{postStretchScore}</Text>
            <Text style={styles.postStretchLabel}>seconds</Text>
          </View>
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
    marginBottom: hp('2%'),
    textAlign:'center',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: hp(4),
    paddingHorizontal: wp(5),
  
  },
  label: {
    fontSize: scale(16),
    color: '#000000',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
    marginBottom: hp(2),
  },
  sliderContainer: {
    width: '100%',
  },
  stretchSlider: {
    width: '100%',
    height: hp('6'),
  },
  rail: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  railSelected: {
    height: 1,
    backgroundColor: '#FF0000',
  },
  scoreCircle: {
    width: wp('8'),
    height: wp('8'),
    borderRadius: wp('5'),
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF0000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: scale(20),
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  painToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: hp(1.2),
    alignItems: 'center',
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: '#FF0000',
  },
  toggleText: {
    fontSize: scale(14),
    color: '#666666',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  activeToggleText: {
    color: '#FFFFFF',
  },
  postStretchContainer: {
    alignItems: 'center',
    width: '100%',
  },
  postStretchValue: {
    fontSize: scale(32),
    color: '#000000',
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  postStretchLabel: {
    fontSize: scale(14),
    color: '#666666',
    fontFamily: typography.fontFamily.WorkSansMedium,
    marginBottom: hp(2),
  },
  postStretchSliderContainer: {
    width: '100%',
    height: hp(12),
  },
  postStretchSlider: {
    width: wp('100'),
    height: hp('18'),
    resizeMode: 'contain',
  },
  postStretchRailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: hp(8),
    paddingTop: hp(1),
  },
  markContainer: {
    alignItems: 'center',
    height: '100%',
  },
  postStretchMark: {
    width: 1,
    height: hp(2),
    backgroundColor: '#E5E5E5',
  },
  postStretchLongMark: {
    height: hp(3),
  },
  postStretchActiveMark: {
    width: 2,
  },
  postStretchMarkText: {
    marginTop: hp(0.5),
    fontSize: scale(12),
    color: '#666666',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  postStretchThumb: {
    width: 2,
    height: hp(4),
    backgroundColor: '#FF0000',
    borderRadius: 1,
  },
  postStretchRailSelected: {
    display: 'none',
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

export default PhysicalAssessmentScreen; 