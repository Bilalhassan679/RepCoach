import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, Switch, Platform, Animated, Easing, Pressable } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import useSettingScreen from './useSettingScreen';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import CacheImage from '../../components/CacheImage';
import { isIOS, wp } from '../../theme/responsive';
import { hp } from '../../theme/responsive';
import { edit, heart, setting, explore, home, arrowright } from '../../assets';
import { colors } from '../../theme/colors';
import { typography } from '../../theme';
import { scale } from '../../theme/typography';
import DividerLine from '../../components/DividerLine';

type RootStackParamList = {
  Profile: undefined;
  MyOrders: undefined;
  MyInvoices: undefined;
  Wishlist: undefined;
  ViewOrders: undefined;
  // ... other screens
};

type NavigationProp = BottomTabNavigationProp<RootStackParamList>;

interface SettingItemProps {
  title: string;
  icon: any;
  onPress?: () => void;
  showToggle?: boolean;
  showArrow?: boolean;
  index: number;
}

const SettingItem = ({ title, icon, onPress, showToggle, showArrow = true, index }: SettingItemProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(50)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          delay: 100 + (index * 50),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          delay: 100 + (index * 50),
          useNativeDriver: true,
        })
      ]).start();

      return () => {
        fadeAnim.setValue(0);
        translateX.setValue(50);
      };
    }, [])
  );

  return (
    <>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX }] }}>
        <Pressable style={styles.settingItem} onPress={onPress}>
          <View style={styles.settingItemLeft}>
            <Image source={icon} style={styles.itemIcon} />
            <Text style={styles.settingItemText}>{title}</Text>
          </View>
          {showToggle ? (
            <Switch
              trackColor={{ false: '#E8E8E8', true: colors.primary.main }}
              thumbColor={isEnabled ? '#fff' : '#fff'}
              onValueChange={() => setIsEnabled(prev => !prev)}
              value={isEnabled}
            />
          ) : showArrow && (
            <Image source={arrowright} style={[styles.arrowIcon]} />
          )}
        </Pressable>
      </Animated.View>
      <DividerLine DividerLineStyle={styles.dividerline} />
    </>
  );
};

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { name, email } = useSettingScreen();
  const { signOut, setUser } = useAuth();
  
  // Animation values
  const profileFadeAnim = useRef(new Animated.Value(0)).current;
  const profileScaleAnim = useRef(new Animated.Value(0.8)).current;
  const sectionFadeAnim = useRef(new Animated.Value(0)).current;
  const sectionTranslateY = useRef(new Animated.Value(30)).current;

  useFocusEffect(
    useCallback(() => {
      // Profile animation
      Animated.parallel([
        Animated.timing(profileFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(profileScaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();

      // Section animation
      Animated.parallel([
        Animated.timing(sectionFadeAnim, {
          toValue: 1,
          duration: 500,
          delay: 300,
          useNativeDriver: true,
        }),
        Animated.timing(sectionTranslateY, {
          toValue: 0,
          duration: 500,
          delay: 300,
          useNativeDriver: true,
        })
      ]).start();

      return () => {
        // Reset animation values when screen loses focus
        profileFadeAnim.setValue(0);
        profileScaleAnim.setValue(0.8);
        sectionFadeAnim.setValue(0);
        sectionTranslateY.setValue(30);
      };
    }, [])
  );

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear user data first
              setUser(null);
              // Then sign out which will trigger navigation through RootNavigator
              signOut();
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        style={[
          styles.profileContainer,
          { 
            opacity: profileFadeAnim,
            transform: [{ scale: profileScaleAnim }]
          }
        ]}
      >
        <CacheImage url={'https://picsum.photos/800/600'} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={styles.editButton}>
          <Image source={edit} style={styles.editImage} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.divider} />

      <Animated.View 
        style={[
          styles.section,
          { 
            opacity: sectionFadeAnim,
            transform: [{ translateY: sectionTranslateY }]
          }
        ]}
      >
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingItem title="My profile" icon={home} onPress={() => navigation.navigate('Profile')} index={0} />
        <SettingItem title="Notifications" icon={setting} showToggle index={1} />
        <SettingItem title="My orders" icon={explore} onPress={() => navigation.navigate('MyOrders')} index={2} />
        <SettingItem title="My inquiries" icon={home} onPress={() => { navigation.navigate('ViewOrders') }} index={3} />
        <SettingItem title="My invoices" icon={explore} onPress={() => navigation.navigate('MyInvoices')} index={4} />
        <SettingItem title="Wishlist" icon={heart} onPress={() => { navigation.navigate('Wishlist') }} index={5} />
      </Animated.View>
      <View style={styles.divider} />
      <Animated.View 
        style={[
          styles.section,
          { 
            opacity: sectionFadeAnim,
            transform: [{ translateY: sectionTranslateY }]
          }
        ]}
      >
        <Text style={styles.sectionTitle}>Terms & Support</Text>
        <SettingItem title="Help Centre" icon={setting} onPress={() => {}} index={6} />
        <SettingItem title="Feedback Submission" icon={edit} onPress={() => {}} index={7} />
      </Animated.View>

      <Animated.View 
        style={[
          styles.section,
          { 
            opacity: sectionFadeAnim,
            transform: [{ translateY: sectionTranslateY }]
          }
        ]}
      >
        <Text style={styles.sectionTitle}>About App</Text>
        <SettingItem title="About Famous Gold" icon={home} onPress={() => {}} index={8} />
        <SettingItem title="Privacy Policy" icon={setting} onPress={() => {}} index={9} />
        <SettingItem title="Terms And Conditions" icon={edit} onPress={() => {}} index={10} />
        {/* <SettingItem title="Logout" icon={edit} onPress={handleSignOut} index={11} /> */}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingHorizontal: wp('5'),
    marginTop: hp('2'),
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: hp('2'),
    
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: hp('1'),
    fontFamily: typography.fontFamily.interMedium,
    marginLeft: wp('2'),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('2'),
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3'),
  },
  settingItemText: {
    fontSize: scale(15),
    color: colors.text.primary,
    fontFamily: typography.fontFamily.interRegular,
  },
  itemIcon: {
    width: wp('5.5'),
    height: wp('5.5'),
    tintColor: colors.primary.main,
  },
  arrowIcon: {
    width: wp('4'),
    height: wp('4'),
    tintColor: colors.text.secondary,
  },
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: wp('5'),
  },
  profileInfo: {
    flex: 1,
    marginLeft: wp('3'),
  },
  profileImage: {
    width: wp('15'),
    height: wp('15'),
    borderRadius: wp('7.5'),
  },
  editButton: {
    padding: wp('2'),
    alignItems: 'center',
  },
  name: {
    fontSize: scale(20),
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: typography.fontFamily.interMedium,
  },
  email: {
    fontSize: scale(12),
    color: colors.text.secondary,
    fontFamily: typography.fontFamily.interRegular,
  },
  editImage: {
    width: wp('6'),
    height: wp('6'),
    tintColor: colors.primary.main,
  },
  divider: {
    height: hp('1.2'),
    backgroundColor: colors.border.primary,
  },
  dividerline: {
    marginLeft: wp('10'),
    marginRight: wp('2'),
    borderBottomColor: colors.border.thin,
  },
});

export default SettingsScreen; 