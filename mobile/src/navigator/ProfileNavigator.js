import React, { useEffect, useState, useContext } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import AuthContext from '../ultility/context';
import AuthNavigator from './AuthNavigator';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import colors from '../styles/colors';
import YourRecipeScreen from '../screens/YourRecipeScreen';
import UpdateRecipeScreen from '../screens/UpdateRecipeScreen';
import DetailScreen from '../screens/DetailScreen';

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
                <ProfileStack.Screen
                    name="ChangeProfile"
                    component={UpdateProfileScreen}
                    options={{
                        headerShown: true,
                        title: "Your Profile",
                        headerTitleAlign: 'center'
                    }}
                />
                <ProfileStack.Screen
                    name='ChangePassword'
                    component={ChangePasswordScreen}
                    options={{
                        headerShown: true,
                        title: "Change Password",
                        headerTitleAlign: 'center'
                    }}
                />
                <ProfileStack.Screen
                    name='YourRecipe'
                    component={YourRecipeScreen}
                    options={{
                        headerShown: true,
                        title: "Your Recipe",
                        headerTitleAlign: 'center'
                    }}
                />
                <ProfileStack.Screen
                    name='UpdateRecipe'
                    component={UpdateRecipeScreen}
                />
                <ProfileStack.Screen
                    name='DetailRecipe'
                    component={DetailScreen}
                />
            </ProfileStack.Navigator>
        );
    }
    return(<></>);
}

export default ProfileNavigator;