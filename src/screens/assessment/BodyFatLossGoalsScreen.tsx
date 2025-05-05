import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp, wp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { typography } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { poststretchbg, redline } from '../../assets';


// Dummy ruler values for demonstration
const MIN = 10;
const MAX = 20;
const MINOR_TICKS = 4;

const RULER_VALUES = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);

type Props = NativeStackScreenProps<RootStackParamList, 'BodyFatLossGoals'>;

const BodyFatLossGoalsScreen: React.FC<Props> = ({ navigation }) => {
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');
  const [goal, setGoal] = useState(12);
  const [bodyFat, setBodyFat] = useState('8lbs');

  const handleContinue = () => {
    navigation.navigate('BodyWeightGoals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 2/5</Text>
          <Text style={styles.progressText}>5 of 6</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: wp(5) }}>
        <Text style={styles.title}>Body Fat Loss Goals</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, unit === 'lbs' && styles.toggleBtnActive]}
            onPress={() => setUnit('lbs')}
          >
            <Text style={[styles.toggleText, unit === 'lbs' && styles.toggleTextActive]}>lbs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, unit === 'kg' && styles.toggleBtnActive]}
            onPress={() => setUnit('kg')}
          >
            <Text style={[styles.toggleText, unit === 'kg' && styles.toggleTextActive]}>kg</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.goalRow}>
          <Text style={styles.goalNumber}>{goal}</Text>
          <Text style={styles.goalUnit}>{unit}</Text>
        </View>
        <Text style={styles.goalLabel}>want to be</Text>
        <View style={styles.rulerBg} >
          <View style={styles.rulerContainerOuter}>
           
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rulerScrollContent}
              snapToInterval={wp(8) + (MINOR_TICKS * (wp(8) / (MINOR_TICKS + 1)))}
              decelerationRate="fast"
            >
              {/* Left spacer */}
              <View style={{ width: wp(40) }} />
              {RULER_VALUES.map((val, idx) => (
                <React.Fragment key={val}>
                  <TouchableOpacity
                    style={styles.rulerMarkWrap}
                    onPress={() => setGoal(val)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.rulerMark, val === goal && styles.rulerMarkActive]} />
                    {val === goal && (
                      <Image
                        source={redline}
                        style={{
                          width: wp('10'),
                          height: hp('10'),
                          resizeMode: 'contain',
                        }}
                      />
                    )}
                    {val !== goal && <Text style={[styles.rulerValue, val === goal && styles.rulerValueActive]}>{val}</Text>}
                  </TouchableOpacity>
                  {/* Minor ticks */}
                  {idx < RULER_VALUES.length - 1 && (
                    <View style={styles.minorTicksWrap}>
                      {Array.from({ length: MINOR_TICKS }, (_, i) => (
                        <View key={i} style={styles.minorTick} />
                      ))}
                    </View>
                  )}
                </React.Fragment>
              ))}
              {/* Right spacer */}
              <View style={{ width: wp(40) }} />
            </ScrollView>
          </View>
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Current body fat ?</Text>
          <TextInput
            style={styles.input}
            value={bodyFat}
            onChangeText={setBodyFat}
            placeholder="8lbs"
            placeholderTextColor="#BDBDBD"
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingTop: hp(1),
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  stepText: {
    fontSize: scale(16),
    color: '#111214',
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
    fontSize: scale(24),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansBold,
    textAlign: 'center',
    marginBottom: hp(2),
    marginTop: hp(2),
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: hp(2),
    marginTop: hp(1),
    alignSelf: 'center',
    width: '100%',
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtn: {
    flex: 1,
    height: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#FF0000',
  },
  toggleText: {
    fontSize: scale(16),
    color: '#BDBDBD',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  toggleTextActive: {
    color: '#FFF',
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  goalNumber: {
    fontSize: scale(56),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansBold,
    marginRight: wp(2),
  },
  goalUnit: {
    fontSize: scale(28),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
    marginBottom: hp(1),
  },
  goalLabel: {
    textAlign: 'center',
    color: '#111214',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansMedium,
    marginBottom: hp(1),
  },
  rulerBg: {
    width: '100%',
    height: hp(10),
    marginVertical: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rulerContainerOuter: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rulerScrollContent: {
    alignItems: 'flex-end',
  },
  rulerMarkWrap: {
    alignItems: 'center',
    width: wp(8),
  },
  rulerMark: {
    width: wp('1'),
    height: hp(6),
    backgroundColor: 'rgba(186, 187, 190, 1)',
    marginBottom: 2,
    borderRadius: 2,
  },
  rulerMarkActive: {
    backgroundColor: '#FF0000',
    height: hp(5),
  },
  rulerValue: {
    fontSize: scale(14),
    color: 'rgba(103, 108, 117, 1)',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  rulerValueActive: {
    color: '#FF0000',
    fontFamily: typography.fontFamily.WorkSansBold,
    fontSize: scale(18),
  },
  inputSection: {
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  inputLabel: {
    fontSize: scale(16),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
    marginBottom: hp(1),
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: scale(16),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansMedium,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(6),
    marginBottom: hp(4),
    marginTop: hp(2),
  },
  buttonText: {
    color: '#FFF',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  minorTicksWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: wp(2),
    marginBottom: hp('4'),
    gap: 3,
  },
  minorTick: {
    width: 1,
    height: hp(1.5),
    backgroundColor: '#C4C4C4',
    marginHorizontal: wp(0.5),
    borderRadius: 1,
  },
});

export default BodyFatLossGoalsScreen; 