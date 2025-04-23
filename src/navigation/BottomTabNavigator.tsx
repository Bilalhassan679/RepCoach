import React, {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet, Platform} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingScreen';
import { home, homeFill, heart, heartFill, setting, settingFill, category,categoryFill ,explore ,exploreFill} from '../assets';
import { CustomHeader } from './RootNavigator';
import WishListScreen from '../screens/WishList';
import CategoriesScreen from '../screens/Categories';
import ExploreScreen from '../screens/ExploreScreen';
const Tab = createBottomTabNavigator();

const tabarComponent = (
  activeImage: any,
  unActiveImage: any,
  title: string,
) => {
  return {
    tabBarIcon: ({focused}: {focused: boolean}) => (
      <View style={styles.tabarView}>
      
        <Image
          style={{...styles.imgstyle, }}
          source={focused ? activeImage : unActiveImage}
        />
      
      </View>
    ),
    title: title,
    tabBarLabelStyle: styles.tabarTitle,
  };
};

const BottomTabNavigator = () => {


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#909090',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: Platform.OS === 'ios' ? 5 : 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
  header: ({route}: {route: any}) => <CustomHeader title={route.name}  />,

      }}>
      <Tab.Screen
        name="Home"
        options={{
          
          ...tabarComponent(
          homeFill,
          home,
          "Home"
        ),
        headerShown: false,  // No custom header for Wishlist

      }
      }
        
        component={HomeScreen}
      
       
      />
      <Tab.Screen
        name="Wishlist"
        options={tabarComponent(
          heartFill,
          heart,
          'Wishlist',
         
        )}
        component={WishListScreen}
      />
      <Tab.Screen
        name="Categories"
        options={tabarComponent(
          categoryFill,
          category,
          'Categories',
          
        )}
        component={CategoriesScreen}
      />
      <Tab.Screen
        name="Explore"
        options={tabarComponent(
          exploreFill,
          explore,
          'Explore',
          
        )}
        component={ExploreScreen}
      />
      <Tab.Screen
        name="Settings"
        options={tabarComponent(
          settingFill,
          setting,
          'Settings',
          
        )}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabarView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgstyle: {
    width: 24,
    height: 24,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dot: {
    position: 'absolute',
    bottom: -2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
  },
  tabarTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default BottomTabNavigator;
