import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Screen from '../screens/Screen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import AuthNavigator from './AuthNavigator';

const ProfileStack = createNativeStackNavigator();

function ProfileNavigator({navigation, route}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user) {
            navigation.replace('Auth');
        }
    }, [])

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

export default ProfileNavigator;