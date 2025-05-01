import React, {memo, useCallback, useRef} from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import useOnboardingScreen from './useOnboarding';
import {styles} from './style';
import {wp, hp} from '../../theme/responsive';
import {TextComponent} from '../components/TextComponent';
import {onboardingleft, onboardingright} from '../../assets';
import CacheImage from '../../components/CacheImage';

export default function OnboardingScreen({navigation}) {
  const {
    onboardingData,
    currentIndex,
    onSnapToItem,
    flatListRef,
    handleNextWithComplete,
    handlePrevWithComplete,
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
            <Text style={styles.centerText}>{item.title}</Text>
            <TextComponent
              numberOfLines={2}
              text={item?.subtitle}
              styles={styles.subtitle}
            />
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
        {/* {currentIndex !== onboardingData.length - 1 && (
          <View style={styles.dotList}>
            {onboardingData.map((_, index) => (
              <View key={index} style={styles.dot(currentIndex, index)} />
            ))}
          </View>
        )} */}

        <View style={styles.arrowContainer}>
          <TouchableOpacity
            style={styles.btnArrow}
            onPress={handlePrevWithComplete}>
            <Image source={onboardingleft} style={styles.arrow} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnArrow}
            onPress={handleNextWithComplete}>
            <Image source={onboardingright} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
