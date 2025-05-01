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
    marginTop: hp('55'),
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
    fontSize: scale(36),
    fontFamily: typography.fontFamily.WorkSansBold,
    paddingHorizontal: wp('10'),
    width: wp('100'),
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansRegular,
    paddingHorizontal: wp('5'),
    width: wp('100'),
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',

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
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('85 '),
  },
  btnArrow: {
    paddingVertical: hp('4'),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: wp('7'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('40'),
  },
  arrow: {
    width: wp('4.5'),
    height: wp('5'),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  arrowText: {
    fontSize: scale(16),
    color: 'white',
    fontFamily: typography.fontFamily.WorkSansMedium,
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
