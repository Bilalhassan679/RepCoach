import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { useProfileScreen } from './useProfileScreen';
import { styles } from './style';
import CacheImage from '../../components/CacheImage';
import { user, edit, lock, sms, arrowleft } from '../../assets';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CustomHeader } from '../../navigation/RootNavigator';
import ChangePasswordBottomSheet from '../../components/ChangePasswordBottomSheet';

interface ProfileItemProps {
  icon: any;
  title: string;
  actionText?: string;
  onPress?: () => void;
  index: number;
}

const ProfileItem = ({ icon, title, actionText, onPress, index }: ProfileItemProps) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();

      return () => {
        slideAnim.setValue(-100);
        opacityAnim.setValue(0);
      };
    }, [])
  );

  return (
    <Animated.View
      style={{
        transform: [{ translateX: slideAnim }],
        opacity: opacityAnim,
      }}
    >
      <TouchableOpacity style={styles.profileItem} onPress={onPress}>
        <View style={styles.profileItemLeft}>
          <Image source={icon} style={styles.itemIcon} />
          <Text style={styles.profileItemTitle}>{title}</Text>
        </View>
        {actionText && (
          <View style={styles.profileItemRight}>
            <Text style={styles.profileItemAction}>{actionText}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user: userData, handleEditProfile } = useProfileScreen();
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  // Animation values
  const headerSlideAnim = useRef(new Animated.Value(-50)).current;
  const headerOpacityAnim = useRef(new Animated.Value(0)).current;
  const profileImageScale = useRef(new Animated.Value(0.3)).current;
  const profileImageOpacity = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      // Animate header
      Animated.parallel([
        Animated.timing(headerSlideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(headerOpacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Animate profile image
      Animated.parallel([
        Animated.spring(profileImageScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(profileImageOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      return () => {
        // Reset animations when screen loses focus
        headerSlideAnim.setValue(-50);
        headerOpacityAnim.setValue(0);
        profileImageScale.setValue(0.3);
        profileImageOpacity.setValue(0);
      };
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        {/* Custom Header */}
        <Animated.View 
          style={{
            transform: [{ translateY: headerSlideAnim }],
            opacity: headerOpacityAnim,
          }}
        >
          <CustomHeader title="Profile" leftButton={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowleft} style={{width: 25, height: 27}} />
            </TouchableOpacity>
          } />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Image */}
          <Animated.View 
            style={[
              styles.profileImageContainer,
              {
                transform: [{ scale: profileImageScale }],
                opacity: profileImageOpacity,
              }
            ]}
          >
            <View style={styles.profileImageWrapper}>
              <CacheImage 
                url={userData.avatar} 
                style={styles.profileImage} 
              />
              <View style={styles.verifiedBadge}>
                <Image 
                  source={edit}
                  style={styles.verifiedIcon}
                />
              </View>
            </View>
          </Animated.View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <ProfileItem
              icon={user}
              title={userData.name}
              actionText="Edit"
              onPress={handleEditProfile}
              index={0}
            />
            <View style={styles.divider} />
            
            <ProfileItem
              icon={sms}
              title={userData.email}
              index={1}
            />
            <View style={styles.divider} />
            
            <ProfileItem
              icon={lock}
              title="**********"
              actionText="Change"
              onPress={() => setShowChangePassword(true)}
              index={2}
            />
          </View>
        </ScrollView>
      </View>

      <ChangePasswordBottomSheet 
        isVisible={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
};

export default ProfileScreen; 