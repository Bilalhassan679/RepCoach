import {useCallback, useEffect, useRef, useState} from 'react';

import {Dimensions} from 'react-native';
import {isIOS} from '../../theme/responsive';
import {onboarding1, onboarding2, onboarding3} from '../../assets';
import {useDispatch} from 'react-redux';
import {completeOnboarding} from '../../store/slices/onboardingSlice';

const useOnboardingScreen = navigation => {
  const flatListRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

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

  const handlePrev = () => {
    if (!isIOS) {
      setCurrentIndex(prev => prev - 1);
      flatListRef.current.scrollToIndex({index: currentIndex - 1});
    } else {
      flatListRef.current.scrollToIndex({index: currentIndex - 1});
    }
  };

  const handleLogin = () => {
    dispatch(completeOnboarding());
    navigation.navigate('Login');
  };

  // Mark onboarding as completed when user proceeds

  // Modified handleNextWithComplete to use the same safety check
  const handleNextWithComplete = () => {
    if (currentIndex === onboardingData.length - 1) {
      dispatch(completeOnboarding());
      navigation.navigate('Login'); // or whatever your signup screen name is
      return; // Exit early
    }
    handleNext();
  };

  const handlePrevWithComplete = () => {
    if (currentIndex === 0) {
      navigation.navigate('Welcome'); // or whatever your signup screen name is
      return; // Exit early
    }
    handlePrev();
  };

  const onboardingData = [
    {
      id: '1',
      title: 'Personalized Fitness Plans',
      subtitle: 'Choose your own fitness journey with us.',
      image: onboarding1,
    },
    {
      id: 0,
      title: 'Extensive Workout Library',
      subtitle: 'Customized to your goals!',
      image: onboarding2,
    },
    {
      id: '3',
      title: 'Health Metrics &  Fitness Analytics',
      image: onboarding3,
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
    handlePrevWithComplete,
  };
};

export default useOnboardingScreen;
