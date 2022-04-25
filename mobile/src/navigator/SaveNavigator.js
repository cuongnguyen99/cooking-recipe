import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import Screen from '../screens/Screen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SaveScreen from '../screens/SaveScreen';

const SaveStack = createNativeStackNavigator();

function SaveNavigator({navigation, route}) {
    const [user, setUser] = useState(null);

    useEffect( ()=> {
        if(!user) {
            navigation.replace('Auth');
        }
    }, []);

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
        </SaveStack.Navigator>
    );
}

export default SaveNavigator;