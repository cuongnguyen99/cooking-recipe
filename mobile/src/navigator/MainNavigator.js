import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

function MainNavigator({navigation, route}) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='App'
        >
            <Stack.Screen
                name='App'
                component={AppNavigator}
            />
            <Stack.Screen
                name='Auth'
                component={AuthNavigator}
                />
        </Stack.Navigator>
    );
}

export default MainNavigator;