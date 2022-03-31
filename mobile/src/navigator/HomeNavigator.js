import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = createNativeStackNavigator();

function HomeNavigator(props) {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStack.Screen
                name='Home'
                component={HomeScreen}
            />
        </HomeStack.Navigator>
    );
}

export default HomeNavigator;