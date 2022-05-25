import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Screen from './screens/Screen';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigator/AppNavigator';
import colors from './styles/colors';
import MainNavigator from './navigator/MainNavigator';
import AuthContext from './ultility/context';
import cache from './ultility/cache';

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState();

  useEffect(()=>{
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  useEffect(() => {
    getUserOffline();
  }, []);

  const getUserOffline = async () => {
    const result = await cache.get("user");
    if(result !== null) {
      return setUser(result);
    }
    return setUser(null);
  }

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