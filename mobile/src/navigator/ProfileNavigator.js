import React, { useEffect, useState, useContext } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import AuthContext from '../ultility/context';
import AuthNavigator from './AuthNavigator';

const ProfileStack = createNativeStackNavigator();

function ProfileNavigator({navigation, route}) {
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if(!user) {
            navigation.replace("Auth");
        }
    }, []);

    if(user) {
        return (
            <ProfileStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <ProfileStack.Screen
                    name='Profile'
                    component={ProfileScreen}
                />
            </ProfileStack.Navigator>
        );
    }
    return(<></>);
}

export default ProfileNavigator;