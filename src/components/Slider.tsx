import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import { wp, hp } from '../theme/responsive';
import { typography } from '../theme';
import CrnRangeSlider from 'crn-range-slider';

const Thumb = () => (
  <View style={styles.thumb}>
    <View style={styles.thumbInner} />
  </View>
);

const Rail = () => <View style={styles.rail} />;

const RailSelected = () => <View style={styles.railSelected} />;

interface SliderProps {
  low: number;
  high: number;
  setHigh: (value: number) => void;
  setLow: (value: number) => void;
  step?: number;
  maxRange: number;
  defaultLow?: number;
  defaultHigh?: number;
}

const Slider = forwardRef(
  (
    {
      low,
      high,
      setHigh,
      setLow,
      step,
      maxRange,
      defaultLow = 0,
      defaultHigh = 100,
    }: SliderProps,
    ref,
  ) => {
    const [resetKey, setResetKey] = useState(0);
    
    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);

    const renderNotch = useCallback((value: number) => (
      <View style={styles.notch}>
        <Text style={styles.notchText}>${value}</Text>
      </View>
    ), []);

    const handleValueChange = useCallback((lowValue: number, highValue: number) => {
      setLow(lowValue);
      setHigh(highValue);
    }, [setLow, setHigh]);

    useImperativeHandle(ref, () => ({
      resetSlider: () => {
        setLow(defaultLow);
        setHigh(defaultHigh);
        setResetKey(prevKey => prevKey + 1);
      },
    }));

    return (
      <View style={styles.container}>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>${Math.round(low)}</Text>
          <Text style={styles.valueText}>${Math.round(high)}</Text>
        </View>

        <CrnRangeSlider
          key={resetKey}
          style={styles.slider}
          min={0}
          max={maxRange}
          step={step || 1}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
          low={low}
          high={high}
          floatingLabel
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: wp('2'),
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2'),
  },
  valueText: {
    fontSize: wp('3.5'),
    fontFamily: typography.fontFamily.interRegular,
    color: '#666',
  },
  slider: {
    height: hp('6'),
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbInner: {
    width: wp('4'),
    height: wp('4'),
    borderRadius: wp('2'),
    backgroundColor: '#FF9933',
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
  notch: {
    backgroundColor: '#FF9933',
    padding: wp('1'),
    borderRadius: wp('1'),
    position: 'absolute',
    top: -hp('4'),
  },
  notchText: {
    color: '#fff',
    fontSize: wp('3'),
    fontFamily: typography.fontFamily.interMedium,
  },
});

export default Slider; 