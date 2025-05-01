import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { scale } from '../../theme/typography';
import { hp, wp } from '../../theme/responsive';
import { typography } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sms, profile,calendar } from '../../assets';

type Props = NativeStackScreenProps<RootStackParamList, 'InformationGathering'>;

const InformationGatheringScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    dateOfJoin: '',
    email: '',
  });

  const handleNext = () => {
    navigation.navigate('GymType');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>Step 1/5</Text>
          <Text style={styles.progressText}>1 of 6</Text>
        </View>
        <Text style={styles.title}>Information Gathering</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Image source={profile} style={styles.icon} />
              <TextInput
                style={styles.input}
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                placeholder="Enter your full name"
                placeholderTextColor="rgba(17, 18, 20, 1)"

                
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
            <Image source={calendar} style={styles.icon} />

              <TextInput
                style={styles.input}
                value={formData.dateOfBirth}
                onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
                placeholder="Date of Birth"
                placeholderTextColor="rgba(17, 18, 20, 1)"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
            <Image source={calendar} style={styles.icon} />

              <TextInput
                style={styles.input}
                value={formData.dateOfJoin}
                onChangeText={(text) => setFormData({ ...formData, dateOfJoin: text })}
                placeholder="Date of Join Repcoach"
                placeholderTextColor="rgba(17, 18, 20, 1)"

              />
            </View>
          </View>

          <View style={styles.inputContainer}>


            <View style={styles.inputWrapper}>
            <Image source={sms} style={styles.icon} />

              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="Email address"
                placeholderTextColor="rgba(17, 18, 20, 1)"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity>
                {/* <Text style={styles.editText}>Edit</Text> */}
              </TouchableOpacity>
            </View>
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
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepText: {
    fontSize: scale(16),
    color: 'rgba(17, 18, 20, 1)',
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  title: {
    fontSize: scale(30),
    marginBottom: 32,
    textAlign: 'left',
    fontFamily: typography.fontFamily.WorkSansBold,
    letterSpacing: 0.5,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    height: 56,
  },
  icon: {

    width: wp('5'),
    height: hp('5'),
    resizeMode: 'contain',
    marginLeft: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  editText: {
    color: '#FF0000',
    fontSize: 14,
    marginRight: 16,
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#FF0000',
    backgroundColor: 'rgba(239, 0, 0, 0.05)',
    paddingHorizontal: hp('1.5'),
    paddingVertical: hp('1'),
    borderRadius: 12,
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
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
});

export default InformationGatheringScreen; 