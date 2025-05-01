import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { assessmentbg } from '../../assets';

type Props = NativeStackScreenProps<RootStackParamList, 'TailoredSolution'>;

const TailoredSolutionScreen: React.FC<Props> = ({ navigation }) => {
  const handleStartPreparation = () => {
    navigation.navigate('SubscriptionStar');
  };

  return (
    <ImageBackground 
      source={assessmentbg} 
      style={styles.container}
      resizeMode="contain"
    >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Tailored Solution{'\n'}Preparation</Text>
            <Text style={styles.subtitle}>
              Your tailored workout plan will be{'\n'}prepared and delivered within two weeks.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleStartPreparation}
          >
            <Text style={styles.buttonText}>Start basic preparation</Text>
          </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    paddingBottom: hp('4%'),
  },
  header: {
    marginTop: hp('8%'),
  },
  title: {
    fontSize: scale(32),
    color: '#111214',
    fontFamily: typography.fontFamily.WorkSansBold,
    lineHeight: scale(40),
    marginBottom: hp('2%'),
    textAlign:'center',
  },
  subtitle: {
    fontSize: scale(16),
    color: 'rgba(17, 18, 20, 0.6)',
    fontFamily: typography.fontFamily.WorkSansRegular,
    lineHeight: scale(24),
    textAlign:'center',

  },
  button: {
    backgroundColor: '#FF0000',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },
});

export default TailoredSolutionScreen; 