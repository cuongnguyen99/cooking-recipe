import React from 'react';
import { Text } from 'react-native';
import Screen from '../screens/Screen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddScreen from '../screens/AddScreen';

const AddStack = createNativeStackNavigator();

function AddNavigator({}) {
    return (
        <AddStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AddStack.Screen
                name='Add'
                component={AddScreen}
            />
        </AddStack.Navigator>
    );
}

export default AddNavigator;