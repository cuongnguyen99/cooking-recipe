import React, { useEffect } from 'react';

import HomeScreen from '../screens/HomeScreen';
import ListFoodScreen from '../screens/ListFoodScreen';
import DetailScreen from '../screens/DetailScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const HomeStack = createNativeStackNavigator();

function HomeNavigator({navigation, route}) {

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Home'
        >
            <HomeStack.Screen
                name='Home'
                component={HomeScreen}
            />
            <HomeStack.Screen
                name='FoodList'
                component={ListFoodScreen}
            />
            <HomeStack.Screen
                name='DetailFood'
                component={DetailScreen}
            />
        </HomeStack.Navigator>
    );
}

export default HomeNavigator;