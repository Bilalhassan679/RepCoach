import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme';
import { wp, hp } from '../theme/responsive';
import { scale } from '../theme/typography';
import { edit, eye } from '../assets';

interface ChangePasswordBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const ChangePasswordBottomSheet: React.FC<ChangePasswordBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      slideAnim.setValue(0);
      backdropOpacity.setValue(0);
      contentOpacity.setValue(0);
      
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 300,
          delay: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const handleChangePassword = () => {
    // Add your password change logic here
    console.log('Changing password...');
    onClose();
  };

  const renderPasswordInput = (
    value: string,
    onChangeText: (text: string) => void,
    label: string,
    showPassword: boolean,
    toggleShowPassword: () => void
  ) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
        
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="••••••••"
          placeholderTextColor={colors.text.secondary}
          secureTextEntry={!showPassword}
          
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={toggleShowPassword}
        >
          <Image
            source={showPassword ? eye : edit}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
        </TouchableWithoutFeedback>
        
        <Animated.View 
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.handle} />
          
          <Animated.View 
            style={[
              styles.content,
              { opacity: contentOpacity }
            ]}
          >
            <Text style={styles.title}>Change Password</Text>

            <View style={styles.inputsContainer}>
              {renderPasswordInput(
                oldPassword,
                setOldPassword,
                'Old password',
                showOldPassword,
                () => setShowOldPassword(!showOldPassword)
              )}

              {renderPasswordInput(
                newPassword,
                setNewPassword,
                'New password',
                showNewPassword,
                () => setShowNewPassword(!showNewPassword)
              )}

              {renderPasswordInput(
                confirmPassword,
                setConfirmPassword,
                'Re-enter new password',
                showConfirmPassword,
                () => setShowConfirmPassword(!showConfirmPassword)
              )}
            </View>

            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  bottomSheet: {
    backgroundColor: colors.background.default,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? hp('4') : hp('3'),
  },
  handle: {
    width: wp('10'),
    height: 4,
    backgroundColor: colors.border.thin,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: hp('1'),
  },
  content: {
    padding: wp('6'),
  },
  title: {
    fontSize: scale(25),
    fontFamily: typography.fontFamily.againstRegular,
    color: colors.text.primary,
    marginBottom: hp('4'),
    textAlign: 'center',
  },
  inputsContainer: {
    gap: hp('2.5'),
    marginBottom: hp('4'),
  },
  inputWrapper: {
    gap: hp('1'),
  },
  inputLabel: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.primary, 
    marginLeft: wp('1'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.thin,
    borderRadius: 8,
    paddingHorizontal: wp('4'),
    height: hp('7'),
    backgroundColor: colors.background.default,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.interRegular,
    fontSize: scale(15),
    paddingVertical: hp('1.0'),
  },
  eyeIcon: {
    padding: wp('2'),
  },
  icon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: colors.text.secondary,
  },
  changeButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 8,
    height: hp('7'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2'),
  },
  buttonText: {
    color: colors.text.inverse,
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
  },
});

export default ChangePasswordBottomSheet; 