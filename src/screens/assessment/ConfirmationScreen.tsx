import React from 'react';
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
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { thumbs } from '../../assets';

type Props = NativeStackScreenProps<RootStackParamList, 'Confirmation'>;

const ConfirmationScreen: React.FC<Props> = ({ navigation }) => {
  const handleConfirm = () => {
    // Handle confirmation logic here
    navigation.navigate('TailoredSolution');
  };

  const handleStartOver = () => {
    navigation.navigate('DataReview');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Confirmation</Text>
        <Text style={styles.subtitle}>
          Confirm the accuracy of the information before submission.
        </Text>
        
          <Image source={thumbs} style={styles.image} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.confirmButton} 
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.startOverButton} 
            onPress={handleStartOver}
          >
            <Text style={styles.startOverButtonText}>Start Over</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',


  },
  title: {
    fontSize: scale(24),
    color: '#000000',
    fontFamily: typography.fontFamily.WorkSansBold,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: scale(14),
    color: '#666666',
    fontFamily: typography.fontFamily.WorkSansRegular,
    textAlign: 'center',
    marginBottom: hp(4),
  },

  image: {
    width: wp('100'),
    height: hp('40'),
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: wp('90'),
    gap: hp(1.5),
  },
  confirmButton: {
    backgroundColor: '#FF0000',
    height: hp(6),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
  startOverButton: {
    backgroundColor: '#F5F5F5',
    height: hp(6),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  startOverButtonText: {
    color: '#666666',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
});

export default ConfirmationScreen; 