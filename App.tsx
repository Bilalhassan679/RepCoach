/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ImageBackground, StyleSheet } from 'react-native';
import { Splash } from './src/assets';


function App(): React.JSX.Element {

  
  const [splashVisible,setSplashVisible]=useState(true);
  
  setTimeout(()=>{
    setSplashVisible(false)
  },2000)
  let Splash_Screen = (


    <ImageBackground
      source={Splash}
      resizeMode="cover"
      style={styles.splash}></ImageBackground>
  );

  return (
    <SafeAreaProvider>

    {
      splashVisible?Splash_Screen:
    
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    }
    </SafeAreaProvider>
  );
}

export default App; 


const styles = StyleSheet.create({
  splash:{
      justifyContent: 'center',
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
  }
})