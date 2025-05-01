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
import { splash } from './src/assets';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const [splashVisible, setSplashVisible] = useState(true);
  
  setTimeout(() => {
    setSplashVisible(false)
  }, 2000)

  const Splash_Screen = (
    <ImageBackground
      source={splash}
      resizeMode="cover"
      style={styles.splash}
    />
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            {splashVisible ? Splash_Screen : <RootNavigator />}
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
  },
});

export default App;