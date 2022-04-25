import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import Screen from '../screens/Screen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddScreen from '../screens/AddScreen';

const AddStack = createNativeStackNavigator();

function AddNavigator({navigation, route}) {
    const [user, setUser] = useState('A');

    useEffect( ()=> {
        if(!user) {
            navigation.replace('Auth');
        }
    }, []);

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