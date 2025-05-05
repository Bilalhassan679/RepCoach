import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp, wp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { typography } from '../../theme/typography';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';

type Props = NativeStackScreenProps<RootStackParamList, 'InjuryHistory'>;

const MAX_LENGTH = 50;

const InjuryHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const [injuryText, setInjuryText] = useState('');
  const [pain, setPain] = useState('Yes');
  const [dropdownFocus, setDropdownFocus] = useState(false);

  const handleContinue = () => {
    navigation.navigate('Surgeries');
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
      <View style={{paddingHorizontal: wp(5)}}>
      <Text style={styles.title}>Injury History</Text>
      <View style={styles.textAreaBox}>
        <TextInput
          style={styles.textArea}
          placeholder="Provide us details on any past injuries..."
          placeholderTextColor="#BDBDBD"
          value={injuryText}
          onChangeText={text => text.length <= MAX_LENGTH && setInjuryText(text)}
          multiline
          maxLength={MAX_LENGTH}
        />
        <View style={styles.counterRow}>
        <Icon name="document-text" size={16} color="#BDBDBD" />

          <Text style={styles.counterText}>{injuryText.length}/{MAX_LENGTH}</Text>
        </View>
      </View>
      <Text style={styles.dropdownLabel}>General pain?</Text>
      <Dropdown
        style={[styles.dropdown, dropdownFocus && { borderColor: '#FF0000' }]}
        containerStyle={styles.dropdownContainer}
        data={[
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
        ]}
        labelField="label"
        valueField="value"
        placeholder="Select"
        value={pain}
        onFocus={() => setDropdownFocus(true)}
        onBlur={() => setDropdownFocus(false)}
        onChange={item => {
          setPain(item.value);
          setDropdownFocus(false);
        }}
        selectedTextStyle={styles.dropdownText}
        itemTextStyle={styles.dropdownText}
        placeholderStyle={styles.dropdownText}
        activeColor="#FFF0F0"
        renderItem={item => (
          <View style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>{item.label}</Text>
          </View>
        )}
      />
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
  assessmentTitle: {
    color: '#BDBDBD',
    fontSize: scale(14),
    fontFamily: typography.fontFamily.WorkSansMedium,
    textAlign: 'left',
    marginTop: hp(1),
    marginBottom: hp(1.5),
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
  tepContainer: {
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

  progressBadge: {
    backgroundColor: 'rgba(239, 0, 0, 0.05)',
    borderRadius: 12,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  progressBadgeText: {
    color: '#FF0000',
    fontSize: scale(14),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },

  title: {
    fontSize: scale(24),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansBold,
    textAlign: 'center',
    marginBottom: hp(2),
    marginTop: hp(2),
  },
  textAreaBox: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    minHeight: hp(18),
    padding: wp(3),
    marginBottom: hp(2),
    justifyContent: 'space-between',
  },
  textArea: {
    fontSize: scale(15),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansMedium,
    minHeight: hp(12),
    textAlignVertical: 'top',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: hp(1),
  },
  counterText: {
    color: '#BDBDBD',
    fontSize: scale(13),
    marginLeft: 4,
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  dropdownLabel: {
    fontSize: scale(15),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
    marginBottom: hp(1),
  },
  dropdown: {
    borderColor: '#E5E5E5',
    borderRadius: 8,
    minHeight: hp(6),
    marginBottom: hp(3),
    backgroundColor: '#FFF',
    paddingHorizontal: wp(3),
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: scale(15),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  dropdownContainer: {
    borderColor: '#E5E5E5',
    borderRadius: 8,
  },
  dropdownItem: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
  },
  button: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(6),
    marginBottom: hp(4),
  },
  buttonText: {
    color: '#FFF',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
});

export default InjuryHistoryScreen; 