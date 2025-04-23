import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../context/AuthContext';

type RootStackParamList = {
  Settings: undefined;
};

type NavigationProp = BottomTabNavigationProp<RootStackParamList>;

export const useProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  
//   const { user } = useAuth();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
  };

  const handleChangePassword = () => {
    // TODO: Implement change password functionality
  };

  const handleAddGallery = () => {
    // TODO: Implement add gallery functionality
  };

  return {
    user: {
      name: 'Mr. Zain',
      email: 'zain.zain03@gmail.com',
      avatar: 'https://picsum.photos/800/600',
    },
    handleBack,
    handleEditProfile,
    handleChangePassword,
    handleAddGallery
  };
};
