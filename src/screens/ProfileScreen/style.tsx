import { StyleSheet, Platform } from 'react-native';
import { wp, hp } from '../../theme/responsive';
import { colors } from '../../theme/colors';
import { scale } from '../../theme/typography';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: Platform.OS === 'ios' ? hp('12') : hp('8'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: hp('2'),
    paddingHorizontal: wp('4'),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backButton: {
    width: wp('10'),
    height: wp('10'),
    justifyContent: 'center',
  },
  backIcon: {
    width: wp('6'),
    height: wp('6'),
    tintColor: '#000',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(20),
    fontFamily: typography.fontFamily.interMedium,
    color: '#000',
    marginRight: wp('10'), // To offset the back button
  },
  content: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: hp('4'),
    marginBottom: hp('4'),
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: wp('28'),
    height: wp('28'),
    borderRadius: wp('14'),
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: wp('4'),
    padding: wp('1.5'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verifiedIcon: {
    width: wp('6'),
    height: wp('6'),
    tintColor: colors.primary.main,
  },
  profileInfo: {
    paddingHorizontal: wp('5'),
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('2'),
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4'),
  },
  itemIcon: {
    width: wp('6'),
    height: wp('6'),
    tintColor: colors.text.secondary,
  },
  profileItemTitle: {
    fontSize: scale(16),
    color: colors.text.primary,
    fontFamily: typography.fontFamily.interRegular,
  },
  profileItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileItemAction: {
    fontSize: scale(14),
    color: colors.primary.main,
    fontFamily: typography.fontFamily.interMedium,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
  },
});
