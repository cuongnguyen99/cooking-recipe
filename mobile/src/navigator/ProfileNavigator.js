import React from 'react';
import { Text } from 'react-native';
import Screen from '../screens/Screen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';

const ProfileStack = createNativeStackNavigator();

function ProfileNavigator(props) {
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