import React, {useEffect, useState} from 'react';
import {View, Text, LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Screen from './screens/Screen';

import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigator/AppNavigator';
import colors from './styles/colors';
import MainNavigator from './navigator/MainNavigator';
import AuthContext from './ultility/context';
import cache from './ultility/cache';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import {useDispatch, useSelector} from 'react-redux';
import jwtDecode from 'jwt-decode';
import userApi from './ultility/api/user';
import {setUser} from './feature/user-slice';
import {setToken} from './feature/auth-slice';

LogBox.ignoreAllLogs(true);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    getAccessTokenOffline();
  }, []);

  const getAccessTokenOffline = async () => {
    try {
      const result = await cache.get('access_token');
      if (result !== null) {
        const userDecode = jwtDecode(result);
        const userData = await userApi.getUser(userDecode.sub, result);
        if(!userData.ok) {
          Toast.showWithGravity("Error when getting user's information! " + result.problem, Toast.LONG, Toast.BOTTOM);
          return console.error("Error when login!");
        }
        const user = userData.data;
        dispatch(setToken(result));
        dispatch(setUser(user));
        return;
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

export default App;
