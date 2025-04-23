import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import RangeSlider from 'rn-range-slider';
import { hp } from '../theme/responsive';
import { wp } from '../theme/responsive';
import { colors } from '../theme/colors';
import { scale } from '../theme/typography';
const RangeSliderComponent = ({
  dollarSign = '',
  plus = '',
  startText = '',
  setMin,
  setMax,
  setRangeValue,
  rangeEnabled,
  step,
  style,
  MIN_DEFAULT,
  MAX_DEFAULT,
  min,
  max,
}:any) => {
  const renderThumb = useCallback(() => <View style={styles.thumb} />, []);
  const renderRail = useCallback(() => <View style={styles.rail} />, []);
  const renderRailSelected = useCallback(() => <View style={styles.railSelected} />, []);

  const handleRangeChange = (low: number, high: number, fromUser: boolean) => {
    // Throttle updates to setMin and setMax
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      setMin(low);
      setMax(high);
    });

    
    // cancelAnimationFrame(
      
    //   () =>  {
    //   console.log('cancelAnimationFrame');
    //   setRangeValue(false);
    // });

  };

  const handleTouchStart = () => {
    setRangeValue(true);
  };

  const handleTouchEnd = () => {
    setRangeValue(false);
  };

  return (
    <>
      <RangeSlider
        style={{
          width: wp('90'),
          height: hp('10'),
          alignSelf: 'center',
          ...style,
        }}
        min={MIN_DEFAULT}
        max={MAX_DEFAULT}
        step={step}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onValueChanged={handleRangeChange}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
      />
    </>
  );
};

export default RangeSliderComponent;

const styles = StyleSheet.create({
  rangeSliderContainer: {
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'white',
  },
  innerContainer: {
    borderRadius: 10,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rangeTextMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('92'),
    alignSelf: 'center',
  },
  rangeTextLeft: {
    color: colors.text.primary,
    textAlign: 'left',
    padding: 7,
    borderRadius: 5,
    width: wp('18'),
    fontWeight: 500,
    fontSize: scale(14),
  },
  rangeTextRight: {
    fontWeight: 500,
    fontSize: scale(14),
  },
  max: {
    backgroundColor: 'red',
  },
  thumb: {
    width: wp('6'),
    height: wp('6'),
    borderRadius: wp('3'),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rail: {
    flex: 1,
    height: hp('0.6'),
    borderRadius: hp('0.3'),
    backgroundColor: '#E0E0E0',
  },
  railSelected: {
    height: hp('0.6'),
    backgroundColor: '#FF9933',
    borderRadius: hp('0.3'),
  },
});
