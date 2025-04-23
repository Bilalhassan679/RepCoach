import {useEffect, useRef, useState} from 'react';

import {Dimensions} from 'react-native';
import {isIOS} from '../../theme/responsive';
import {Onboarding, Onboarding1, Onboarding2} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useOnboardingScreen = navigation => {
  const flatListRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onSnapToItem = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(
      contentOffsetX / Dimensions.get('window').width,
    );
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    // Check if we're already at the last slide
    if (currentIndex >= onboardingData.length - 1) {
      // Navigate to sign up screen instead of scrolling
      navigation.navigate('SignUp'); // or whatever your signup screen name is
      return; // Exit the function early
    }

    // Only scroll if we're not at the last index
    if (!isIOS) {
      setCurrentIndex(prev => prev + 1);
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  // Check if user has seen onboarding before
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding === 'true') {
        // User has seen onboarding before, navigate to appropriate screen
        navigation.replace('Login'); // or whatever your main/login screen name is
      }
    } catch (error) {
      console.log('Error checking onboarding status:', error);
    }
  };

  // Mark onboarding as completed when user proceeds
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    } catch (error) {
      console.log('Error saving onboarding status:', error);
    }
  };

  // Modified handleNextWithComplete to use the same safety check
  const handleNextWithComplete = () => {
    if (currentIndex === onboardingData.length - 1) {
      completeOnboarding();
      navigation.navigate('Register'); // or whatever your signup screen name is
      return; // Exit early
    }
    handleNext();
  };

  // Modified handleLogin to mark onboarding as completed
  const handleLoginWithComplete = () => {
    completeOnboarding();
    handleLogin();
  };

  const onboardingData = [
    {
      id: '1',
      title: 'Welcome to Famous Gold Inc Your Trusted Partner',
      subtitle: 'The Gold Jewelry\nSince 2023',
      image: Onboarding,
    },
    {
      id: 0,
      title: 'Jewelry You Can Trust, \n Quality You Deserve',
      subtitle: 'Quality that Deserves',
      image: Onboarding1,
    },
    {
      id: '3',
      title: 'Get Started',
      subtitle: "We're the name of trusted and real jewelry",
      subtitle1: '\nWanna be a part of famous gold society?',
      image: Onboarding2,
    },
  ];

  return {
    onboardingData,
    currentIndex,
    onSnapToItem,
    flatListRef,
    handleNext,
    handleLogin,
    handleNextWithComplete,
    handleLoginWithComplete,
  };
};

export default useOnboardingScreen;
