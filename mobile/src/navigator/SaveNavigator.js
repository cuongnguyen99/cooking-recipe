import React, { useEffect, useState, useContext } from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SaveScreen from '../screens/SaveScreen';
import AuthContext from '../ultility/context';
import DetailScreen from '../screens/DetailScreen';

const SaveStack = createNativeStackNavigator();

function SaveNavigator({navigation, route}) {
    const {user} = useContext(AuthContext);

    useEffect( () => {
        if(!user) {
            navigation.replace('Auth');
        }
    }, []);

    if(user) {
        return (
            <SaveStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <SaveStack.Screen
                    name='Save'
                    component={SaveScreen}
                />
                <SaveStack.Screen
                    name="Detail"
                    component={DetailScreen}
                />
            </SaveStack.Navigator>
        ); 
    }
    return (<></>);
}

export default SaveNavigator;