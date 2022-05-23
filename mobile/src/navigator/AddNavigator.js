import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';
import Screen from '../screens/Screen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddScreen from '../screens/AddScreen';
import AuthContext from '../ultility/context';

const AddStack = createNativeStackNavigator();

function AddNavigator({navigation, route}) {
    const {user} = useContext(AuthContext);

    useEffect( ()=> {
        if(!user) {
            navigation.replace('Auth');
        }
    }, []);

    if(user) {
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
    // return (
    //     <AddStack.Navigator
    //         screenOptions={{
    //             headerShown: false
    //         }}
    //     >
    //         <AddStack.Screen
    //             name='Add'
    //             component={AddScreen}
    //         />
    //     </AddStack.Navigator>
    // );
}

export default AddNavigator;