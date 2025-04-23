import {Platform, PixelRatio} from 'react-native';

// const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
// const STANDARD_WIDTH = 375; // iPhone X/11 Pro/12 Mini
// const STANDARD_HEIGHT = 812;

// export const scale = (size: number) => {
//   const widthRatio = SCREEN_WIDTH / STANDARD_WIDTH;
//   const heightRatio = SCREEN_HEIGHT / STANDARD_HEIGHT;
//   const ratio = Math.min(widthRatio, heightRatio);

//   // Different scale factors for different screen sizes
//   let factor = 1;
//   if (SCREEN_WIDTH <= 320) {
//     // iPhone SE 1st gen
//     factor = 0.85;
//   } else if (SCREEN_WIDTH < 375) {
//     // Smaller phones
//     factor = 0.9;
//   } else if (SCREEN_WIDTH >= 414) {
//     // iPhone Plus/Pro Max models, larger Android
//     factor = 1.1;
//   }

//   const newSize = size * ratio * factor;
//   return Math.round(PixelRatio.roundToNearestPixel(newSize));
// };

const fontScale = PixelRatio.getFontScale();

export const scale = (size: number) => size / fontScale;

export const typography = {
  // Font Families
  fontFamily: {
    interLight: Platform.select({
      ios: 'Inter-Light',
      android: 'Inter-Light',
    }),
    interMedium: Platform.select({
      ios: 'Inter-Medium',
      android: 'Inter-Medium',
    }),
    interRegular: Platform.select({
      ios: 'Inter-Regular',
      android: 'Inter-Regular',
    }),
    interSemiBold: Platform.select({
      ios: 'Inter-SemiBold',
      android: 'Inter-SemiBold',
    }),
    interBold: Platform.select({
      ios: 'Inter-Bold',
      android: 'Inter-Bold',
    }),
    apolloRegular: Platform.select({
      ios: 'APOLLO-Regular',
      android: 'APOLLO-Regular',
    }),
    againstRegular: Platform.select({
      ios: 'Against-Regular',
      android: 'Against-Regular',
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
