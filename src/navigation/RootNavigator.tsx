import React, {JSX} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import {useAuth} from '../context/AuthContext';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import {arrowleft, edit, headerBg} from '../assets';
import {typography} from '../theme/typography';
import {scale} from '../theme/typography';
import {hp, wp} from '../theme/responsive';
import ProfileScreen from '../screens/ProfileScreen';
import MyOrdersScreen from '../screens/MyOrders';
import ViewOrdersScreen from '../screens/ViewOrders';
import MyInvoicesScreen from '../screens/MyInvoices';
import ProductDetail from '../screens/ProductDetail';
import NewArrival from '../screens/NewArrival';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const CustomHeader = ({
  title,
  leftButton,
  rightButton,
}: {
  title: string;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
}) => {
  return (
    <ImageBackground source={headerBg} style={styles.header} resizeMode="cover">
      <View style={styles.headerContent}>
        {leftButton && (
          <TouchableOpacity style={styles.leftButton}>
            {leftButton}
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
        {rightButton && (
          <TouchableOpacity style={styles.rightButton}>
            {rightButton}
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const RootNavigator = () => {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isAuthenticated ? (
          // Auth Stack
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Group>
            {/* Main App Stack */}
            <Stack.Screen name="MainApp" component={BottomTabNavigator} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MyOrders"
              component={MyOrdersScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ViewOrders"
              component={ViewOrdersScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MyInvoices"
              component={MyInvoicesScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="NewArrival" component={NewArrival} />
          </Stack.Group>
        )}

    
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  header: {
    height: hp(Platform.OS === 'ios' ? '13' : '9'),
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: scale(25),
    fontFamily: typography.fontFamily.apolloRegular,
    
  },
  headerContent: {
    width: '100%',
    alignItems: 'center',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    top:0,
    zIndex: 1000,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightButton: {
    position: 'absolute',
    right: 0,
    top:0,
      zIndex: 1000,
  },
});
