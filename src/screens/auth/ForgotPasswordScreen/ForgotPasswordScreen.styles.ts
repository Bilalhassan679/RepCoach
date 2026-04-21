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
  content: {
    flex: 1,
    padding: wp('5'),
    justifyContent: 'center',
  },
  title: {
    fontSize: scale(24),
    fontFamily: typography.fontFamily.WorkSansBold,
    color: '#000',
    marginBottom: hp('1'),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: hp('4'),
    textAlign: 'center',
    paddingHorizontal: wp('5'),
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  form: {
    gap: hp('1.5'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: hp('2'),
    borderRadius: wp('2'),
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansRegular,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
  inputError: {
    borderColor: colors.secondary.main,
  },
  errorText: {
    color: colors.secondary.main,
    fontSize: scale(14),
    marginTop: -hp('1'),
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  button: {
    backgroundColor: colors.primary.main,
    padding: hp('2'),
    borderRadius: wp('2'),
    alignItems: 'center',
    marginTop: hp('1'),
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansMedium,
  },
  linkButton: {
    marginTop: hp('2'),
    alignItems: 'center',
  },
  linkText: {
    color: colors.primary.main,
    fontSize: scale(14),
    fontFamily: typography.fontFamily.WorkSansMedium,
    textDecorationLine: 'underline',
  },
});

export default styles;
