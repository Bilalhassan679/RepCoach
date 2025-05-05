import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp, wp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { typography } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'GoalsAndProgramInterest'>;

const GOALS = [
  { label: 'Running' },
  { label: 'Healthy Aging' },
  { label: 'Fat Loss' },
  { label: 'Weight Loss' },
  { label: 'Weight Gain' },
  { label: 'Beginner Level', sub: '(Intro to Weights)' },
  { label: 'Corrective Exercise' },
];

const GoalsAndProgramInterestScreen: React.FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState('Running');

  const handleSelect = (goal: string) => setSelected(goal);

  const handleContinue = () => {
    navigation.navigate('InjuryHistory');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 2/5</Text>
          <Text style={styles.progressText}>1 of 6</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressFill, { width: '33%' }]} />
        </View>
      </View>
      <Text style={styles.title}>
        Goals and Program{"\n"}Interest
      </Text>
      <FlatList
        data={GOALS}
        keyExtractor={(item) => item.label}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.radioOption}
            onPress={() => handleSelect(item.label)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Text style={styles.radioLabel}>
                {item.label}
                {item.sub && (
                  <Text style={styles.radioSub}>  {item.sub}</Text>
                )}
              </Text>
            </View>
            <Icon
              name={selected === item.label ? 'radiobox-marked' : 'radiobox-blank'}
              size={22}
              color={selected === item.label ? '#FF0000' : '#BDBDBD'}
            />
          </Pressable>
        )}
      />
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
    marginBottom: hp(3),
    marginTop: hp(2),
  },
  listContent: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginBottom: hp(1.2),
  },
  radioLabel: {
    fontSize: scale(16),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  radioSub: {
    fontSize: scale(12),
    color: '#666',
    fontFamily: typography.fontFamily.WorkSansRegular,
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

export default GoalsAndProgramInterestScreen; 