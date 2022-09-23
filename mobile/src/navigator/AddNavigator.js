import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';
import Screen from '../screens/Screen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddScreen from '../screens/AddScreen';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddStack = createNativeStackNavigator();

function AddNavigator() {
    const navigation = useNavigation();
    const route = useRoute();
    const token = useSelector(state => state.auth_slice.token);

    useEffect(()=> {
        if(!token) {
            navigation.replace('Auth');
        }
    }, []);

    if(token) {
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

    return(<></>);
}

export default AddNavigator;