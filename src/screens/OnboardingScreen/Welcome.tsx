import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  ImageBackground 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logo, onboarding } from '../../assets';
import CacheImage from '../../components/CacheImage';
import { hp } from '../../theme/responsive';
import { wp } from '../../theme/responsive';
import { colors } from '../../theme/colors';
import { typography } from '../../theme';
import { useAppDispatch } from '../../store';
import { completeOnboarding } from '../../store/slices/onboardingSlice';

const {width} = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={onboarding}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
                <CacheImage url={logo} style={styles.logo} />
            </View>
            
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome{'\n'}To Rep Coach</Text>
              <Text style={styles.subtitle}>Your personal fitness assistant</Text>
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Onboarding')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Text style={styles.buttonIcon}>→</Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have account? </Text>
              <TouchableOpacity onPress={() => {
                dispatch(completeOnboarding());
                navigation.navigate('Login');
              }}>
                <Text style={styles.signInLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: width,
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('11'),
    marginRight: hp('4'),
  },
  logo: {
    width: wp('26'),
    height: hp('10'),
    resizeMode: 'contain',
  },

  textContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: typography.fontFamily.WorkSansBold,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  button: {
    backgroundColor:colors.primary.main,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonIcon: {
    color: 'white',
    fontSize: 20,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  signInLink: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;