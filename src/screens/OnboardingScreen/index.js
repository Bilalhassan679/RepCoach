import React, {memo, useCallback, useRef} from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import useOnboardingScreen from './useOnboarding';
import {styles} from './style';
import {wp, hp} from '../../theme/responsive';
import {TextComponent} from '../components/TextComponent';

export default function OnboardingScreen({navigation}) {
  const {
    onboardingData,
    currentIndex,
    onSnapToItem,
    flatListRef,
    handleNext,
    handleLogin,
    handleNextWithComplete,
    handleLoginWithComplete,
  } = useOnboardingScreen(navigation);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <ImageBackground
          resizeMode="cover"
          source={item?.image}
          style={styles.bgImage}
          key={index}>
          <View style={styles.centerMainView}>
            <Text style={styles.centerText}>
              {item.title}
              {currentIndex === 0 && (
                <TextComponent
                  numberOfLines={2}
                  text={'\nFine Gold Jewelry\n'}
                  styles={styles.subtitle}
                />
              )}

              {currentIndex === 2 && (
                <TextComponent
                  numberOfLines={2}
                  text={item?.subtitle1}
                  styles={styles.subtitle1}
                />
              )}
              {currentIndex === 0 && 'Since 2001.'}
            </Text>
          </View>
        </ImageBackground>
      );
    },
    [currentIndex],
  );

  return (
    <View style={{flex: 1, position: 'relative', width: wp('100'), zIndex: 1}}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onSnapToItem}
      />

      <View style={styles.bottomContainer}>
        {currentIndex !== onboardingData.length - 1 && (
          <View style={styles.dotList}>
            {onboardingData.map((_, index) => (
              <View key={index} style={styles.dot(currentIndex, index)} />
            ))}
          </View>
        )}
        {currentIndex === onboardingData.length - 1 && (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLoginWithComplete}>
            <TextComponent text={'Login'} styles={styles.arrowText} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.btnArrow}
          onPress={handleNextWithComplete}>
          <TextComponent
            text={
              currentIndex === onboardingData.length - 1 ? 'Sign Up' : 'Next'
            }
            styles={styles.arrowText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
