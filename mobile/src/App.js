import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Screen from './screens/Screen';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigator/AppNavigator';
import colors from './styles/colors';
import MainNavigator from './navigator/MainNavigator';
import AuthContext from './ultility/context';

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState();

  useEffect(()=>{
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user, setUser, accessToken, setAccessToken,
      }}
    >
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;