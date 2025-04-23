import React from 'react';
import {StyleSheet, View} from 'react-native';
import { hp } from '../theme/responsive';
const DividerLine = ({DividerLineStyle}: {DividerLineStyle: any}) => {
  return (
    <View
      style={{
        ...DividerLineStyle,
        borderBottomColor: 'rgba(0, 0, 0, 0.5);',
        borderBottomWidth: StyleSheet.hairlineWidth,
        // padding: 5,
        // marginBottom: hp('1.5'),
      }}
    />
  );
};

export default DividerLine;
