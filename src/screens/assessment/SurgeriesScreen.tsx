import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp, wp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { typography } from '../../theme/typography';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';

type Props = NativeStackScreenProps<RootStackParamList, 'Surgeries'>;



const SurgeriesScreen: React.FC<Props> = ({ navigation }) => {
  const [surgeries, setSurgeries] = useState<{ label: string; selected: boolean }[]>([]);
  const [pain, setPain] = useState('Yes');
  const [dropdownFocus, setDropdownFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleContinue = () => {
    navigation.navigate('DiseasesHealthIssues');
  };

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (
      trimmed.length > 0 &&
      !surgeries.some(s => s.label.toLowerCase() === trimmed.toLowerCase()) &&
      surgeries.filter(s => s.selected).length < 10
    ) {
      setSurgeries([...surgeries, { label: trimmed, selected: true }]);
      setInputValue('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 2/5</Text>
          <Text style={styles.progressText}>3 of 6</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
      </View>
      <View style={{paddingHorizontal: wp(5)}}>

      <Text style={styles.title}>Surgeries</Text>
      <View style={styles.tagsBox}>
        <View style={styles.tagsRow}>
          {surgeries.map((s, i) => (
            <TouchableOpacity
              key={s.label}
              style={[styles.tag, s.selected && styles.tagSelected]}
              onLongPress={() => {
                setSurgeries(surgeries.filter(tag => tag.label !== s.label));
              }}
              delayLongPress={300}
            >
              <Text style={[styles.tagText, s.selected && styles.tagTextSelected]}>{s.label}</Text>
            </TouchableOpacity>
          ))}
          <TextInput
            style={styles.tagInput}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Add surgery"
            placeholderTextColor="#BDBDBD"
            onSubmitEditing={handleAddTag}
            blurOnSubmit={false}
            returnKeyType="done"
            maxLength={30}
          />
        </View>
        <View style={styles.counterRow}>
          <Icon name="document-text" size={16} color="#BDBDBD" />
          <Text style={styles.counterText}>{surgeries.filter(s => s.selected).length}/10</Text>
        </View>
      </View>
      <Text style={styles.dropdownLabel}>Still have pain in surgeries area?</Text>
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
  tagsBox: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    minHeight: hp(18),
    padding: wp(3),
    marginBottom: hp(2),
    justifyContent: 'space-between',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(2),
    marginBottom: hp(2),
  },
  tag: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF0000',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.7),
    marginRight: wp(2),
    marginBottom: hp(1),
  },
  tagSelected: {
    backgroundColor: '#FFF0F0',
  },
  tagText: {
    color: '#FF0000',
    fontSize: scale(14),
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  tagTextSelected: {
    fontFamily: typography.fontFamily.WorkSansSemiBold,
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
    borderWidth: 1,
    paddingHorizontal: wp(3),
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
  tagInput: {
    minWidth: wp(18),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.7),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    fontSize: scale(14),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansMedium,
    marginRight: wp(2),
    marginBottom: hp(1),
    backgroundColor: '#FFF',
  },
});

export default SurgeriesScreen; 