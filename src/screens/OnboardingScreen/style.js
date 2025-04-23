import {Dimensions, StyleSheet} from 'react-native';

import {hp, isIOS, wp} from '../../theme/responsive';
import {colors, typography} from '../../theme';
import {scale} from '../../theme/typography';

export const styles = StyleSheet.create({
  dotList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: hp('3'),
    width: wp('100'),
    zIndex: 2,
  },
  centerMainView: {
    width: wp('100'),
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    marginTop: hp('45'),
  },
  centerHeading: {
    fontSize: hp('4.4'),
    marginVertical: hp('2'),
    paddingHorizontal: wp('4'),
    width: wp('100'),
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  centerText: {
    fontSize: scale(24),
    fontFamily: typography.fontFamily.apolloRegular,
    paddingHorizontal: wp('5'),
    width: wp('100'),
    textAlign: 'center',
    color: 'white',
    lineHeight: hp('4'),
  },
  subtitle: {
    fontSize: scale(24),
    fontFamily: typography.fontFamily.apolloRegular,
    paddingHorizontal: wp('5'),
    width: wp('100'),
    textAlign: 'center',
    color: colors.primary.main,

    lineHeight: hp('4'),
  },
  subtitle1: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.apolloRegular,
    paddingHorizontal: wp('5'),
    width: wp('100'),
    textAlign: 'center',
    color: 'white',

    lineHeight: hp('4'),
  },
  dot: (currentIndex, index) => ({
    marginLeft: wp('1'),
    marginBottom: hp(isIOS ? '7' : '6'),
    marginTop: hp('2'),
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    height: Dimensions.get('window').width * 0.02,
    width:
      currentIndex == index
        ? Dimensions.get('window').width * 0.08
        : Dimensions.get('window').width * 0.02,
    backgroundColor: currentIndex == index ? colors.primary.main : '',
    borderWidth: currentIndex == index ? 0 : 1,
    borderColor:
      currentIndex == index ? colors.primary.main : colors.primary.main,
  }),
  bgImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnArrow: {
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('3'),
    backgroundColor: colors.primary.main,
    borderRadius: wp('1'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('90'),
  },
  arrowText: {
    fontSize: scale(16),
    color: 'white',
    fontFamily: typography.fontFamily.interMedium,
  },
  loginBtn: {
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('3'),
    borderRadius: wp('1'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('90'),
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: hp('1'),
  },
});
