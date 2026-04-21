import {Platform, PixelRatio} from 'react-native';

const fontScale = PixelRatio.getFontScale();

export const scale = (size: number) => size / fontScale;

export const typography = {
  // Font Families
  fontFamily: {
    // WorkSans-Regular 400
    WorkSansLight: Platform.select({
      ios: 'WorkSans-Light',
      android: 'WorkSans-Light',
    }),
    // WorkSans-Medium 500
    WorkSansMedium: Platform.select({
      ios: 'WorkSans-Medium',
      android: 'WorkSans-Medium',
    }),
    // WorkSans-Regular 400
    WorkSansRegular: Platform.select({
      ios: 'WorkSans-Regular',
      android: 'WorkSans-Regular',
    }),
    // WorkSans-SemiBold 600
    WorkSansSemiBold: Platform.select({
      ios: 'WorkSans-SemiBold',
      android: 'WorkSans-SemiBold',
    }),
    // WorkSans-Bold 700
    WorkSansBold: Platform.select({
      ios: 'WorkSans-Bold',
      android: 'WorkSans-Bold',
    }),
    // WorkSans-ExtraBold 800
    WorkSansExtraBold: Platform.select({
      ios: 'WorkSans-ExtraBold',
      android: 'WorkSans-ExtraBold',
    }),
    // WorkSans-ExtraLight 200
    WorkSansExtraLight: Platform.select({
      ios: 'WorkSans-ExtraLight',
      android: 'WorkSans-ExtraLight',
    }),
    // WorkSans-Thin 100
    WorkSansThin: Platform.select({
      ios: 'WorkSans-Thin',
      android: 'WorkSans-Thin',
    }),
  },

  // Font Sizes
  fontSize: {
    titleFont: scale(24),
    subtileFont: scale(20),
    s12: scale(12),
    s14: scale(14),
    s16: scale(16),
    s18: scale(18),
    s20: scale(20),
    s24: scale(24),
    s32: scale(32),
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Font Weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Text Styles
  textStyles: {
    h1: {
      fontSize: scale(32),
      lineHeight: 1.2,
      fontWeight: '700',
    },
    h2: {
      fontSize: scale(24),
      lineHeight: 1.3,
      fontWeight: '700',
    },
    h3: {
      fontSize: scale(20),
      lineHeight: 1.4,
      fontWeight: '600',
    },
    body1: {
      fontSize: scale(16),
      lineHeight: 1.5,
      fontWeight: '400',
    },
    body2: {
      fontSize: scale(14),
      lineHeight: 1.5,
      fontWeight: '400',
    },
    caption: {
      fontSize: scale(12),
      lineHeight: 1.5,
      fontWeight: '400',
    },
    button: {
      fontSize: scale(16),
      lineHeight: 1.5,
      fontWeight: '600',
    },
  },
} as const;
