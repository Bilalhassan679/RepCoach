import React from 'react';
import {Text} from 'react-native';
import {Colors, fontFamily} from '../Theme/Variables';
import {hp} from '../../theme/responsive';

export const TextComponent = ({
  text,
  styles,
  onPress,
  numberOfLines,
  color,
}) => {
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={{
        // color: Colors.primaryColor,
        fontSize: hp('2'),
        ...styles,
      }}>
      {text}
    </Text>
  );
};
