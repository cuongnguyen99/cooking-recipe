import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Screen from './screens/Screen';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigator/AppNavigator';
import colors from './styles/colors';
import MainNavigator from './navigator/MainNavigator';

function App() {
  useEffect(()=>{
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
  );
}

export default App;