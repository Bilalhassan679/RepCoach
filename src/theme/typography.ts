import {Platform, PixelRatio} from 'react-native';

const fontScale = PixelRatio.getFontScale();

export const scale = (size: number) => size / fontScale;

export const typography = {
  // Font Families
  fontFamily: {
    WorkSansLight: Platform.select({
      ios: 'WorkSans-Light',
      android: 'WorkSans-Light',
    }),
    WorkSansMedium: Platform.select({
      ios: 'WorkSans-Medium',
      android: 'WorkSans-Medium',
    }),
    WorkSansRegular: Platform.select({
      ios: 'WorkSans-Regular',
      android: 'WorkSans-Regular',
    }),
    WorkSansSemiBold: Platform.select({
      ios: 'WorkSans-SemiBold',
      android: 'WorkSans-SemiBold',
    }),
    WorkSansBold: Platform.select({
      ios: 'WorkSans-Bold',
      android: 'WorkSans-Bold',
    }),
    WorkSansExtraBold: Platform.select({
      ios: 'WorkSans-ExtraBold',
      android: 'WorkSans-ExtraBold',
    }),
    WorkSansExtraLight: Platform.select({
      ios: 'WorkSans-ExtraLight',
      android: 'WorkSans-ExtraLight',
    }),
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
