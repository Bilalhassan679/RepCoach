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

type Props = NativeStackScreenProps<RootStackParamList, 'DiseasesHealthIssues'>;

const DiseasesHealthIssuesScreen: React.FC<Props> = ({ navigation }) => {
  const [diseases, setDiseases] = useState<{ label: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleContinue = () => {
    navigation.navigate('BodyFatLossGoals');
  };

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (
      trimmed.length > 0 &&
      !diseases.some(d => d.label.toLowerCase() === trimmed.toLowerCase()) &&
      diseases.length < 10
    ) {
      setDiseases([...diseases, { label: trimmed }]);
      setInputValue('');
    }
  };

  const handleDeleteTag = (label: string) => {
    setDiseases(diseases.filter(tag => tag.label !== label));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 2/5</Text>
          <Text style={styles.progressText}>4 of 6</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>
      </View>
      <View style={{paddingHorizontal: wp(5)}}>
        <Text style={styles.title}>Diseases/{"\n"}Health Issues</Text>
        <View style={styles.tagsBox}>
          <View style={styles.tagsRow}>
            {diseases.map((d, i) => (
              <TouchableOpacity
                key={d.label}
                style={styles.tag}
                onLongPress={() => handleDeleteTag(d.label)}
                delayLongPress={300}
              >
                <Text style={styles.tagText}>{d.label}</Text>
              </TouchableOpacity>
            ))}
            <TextInput
              style={styles.tagInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Add disease/issue"
              placeholderTextColor="#BDBDBD"
              onSubmitEditing={handleAddTag}
              blurOnSubmit={false}
              returnKeyType="done"
              maxLength={30}
            />
          </View>
          <View style={styles.counterRow}>
            <Icon name="document-text" size={16} color="#BDBDBD" />
            <Text style={styles.counterText}>{diseases.length}/10</Text>
          </View>
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
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF0000',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.7),
    marginRight: wp(2),
    marginBottom: hp(1),
  },
  tagText: {
    color: '#FF0000',
    fontSize: scale(14),
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

export default DiseasesHealthIssuesScreen; 