import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const isIOS = Boolean(Platform.OS == 'ios');

export {wp, hp, isIOS};
