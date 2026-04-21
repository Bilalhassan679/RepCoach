import {StyleSheet} from 'react-native';
import {wp, hp} from '../../../theme/responsive';
import {scale} from '../../../theme/typography';
import {typography} from '../../../theme';
import {colors} from '../../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: wp('5'),
  },
  title: {
    fontSize: scale(24),
    fontFamily: typography.fontFamily.WorkSansBold,
    color: '#000',
    marginTop: hp('2'),
  },
  subtitle: {
    fontSize: scale(14),
    color: '#666',
    marginTop: hp('1'),
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  form: {
    gap: hp('1'),
  },
  formTitle: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.WorkSansBold,
    color: '#000',
    marginTop: hp('2'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: wp('2'),
    paddingHorizontal: wp('4'),
    height: hp('7'),
  },
  input: {
    flex: 1,
    marginLeft: wp('2'),
    color: '#000',
    fontSize: scale(16),
  },
  inputIcon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: '#666',
  },
  eyeIcon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: '#666',
  },
  errorText: {
    color: colors.secondary.main,
    fontSize: scale(14),
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F79B00',
    padding: hp('2'),
    borderRadius: wp('2'),
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1'),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    color: '#666',
    fontSize: scale(14),
    marginHorizontal: wp('3'),
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp('4'),
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: wp('4'),
    borderRadius: wp('50'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialIcon: {
    width: wp('7'),
    height: wp('7'),
    resizeMode: 'contain',
  },
  linkButton: {
    marginTop: hp('3'),
    alignItems: 'center',
  },
  linkText: {
    color: '#FF0000',
    fontFamily: typography.fontFamily.WorkSansMedium,
    textDecorationLine: 'underline',
  },
  loginText: {
    color: '#F79B00',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  forgotText: {
    color: '#F79B00',
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: hp('8'),
    marginBottom: hp('4'),
  },
  logo: {
    width: wp('20'),
    height: wp('20'),
    resizeMode: 'contain',
  },
  signUpButton: {
    backgroundColor: '#FF0000',
    borderRadius: wp('2'),
    height: hp('7'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2'),
  },
  footer: {
    alignItems: 'center',
    marginTop: hp('3'),
  },
  footerText: {
    color: '#666',
    fontSize: scale(14),
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default styles;
