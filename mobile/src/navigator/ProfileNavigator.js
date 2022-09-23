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
import ManageListScreen from '../screens/ManageListScreen';
import ManageRecipeScreen from '../screens/ManageRecipeScreen';
import MyRecipeNavigator from './MyRecipeNavigator';
import RecipeAcceptedScreen from '../screens/RecipeAcceptedScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const ProfileStack = createNativeStackNavigator();

function ProfileNavigator() {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth_slice.token);

    useEffect(() => {
        if(!token) {
            navigation.replace("Auth");
        }
    }, []);

    if(token) {
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
                    component={MyRecipeNavigator}
                    options={{
                        headerShown: true,
                        title: "My Recipe",
                        headerTitleAlign: 'center'
                    }}
                />
                <ProfileStack.Screen
                    name='UpdateRecipe'
                    component={UpdateRecipeScreen}
                    options={{
                        headerShown: true,
                        title: "Update Recipe",
                        headerTitleAlign: 'center'
                    }}
                />
                <ProfileStack.Screen
                    name='DetailRecipe'
                    component={RecipeAcceptedScreen}
                    options={{
                        headerShown: true,
                        title: "",
                        headerTitleAlign: 'center'
                    }}
                />
                <ProfileStack.Screen
                    name='ListManage'
                    component={ManageListScreen}
                    options={{
                        headerShown: true,
                        title: "Recipe List",
                        headerTitleAlign: 'center'
                    }}
                />
                <ProfileStack.Screen
                    name='ManageRecipe'
                    component={ManageRecipeScreen}
                    options={{
                        headerShown: true,
                        headerTitleAlign: 'center'
                    }}
                />
            </ProfileStack.Navigator>
        );
    }
    return(<></>);
}

export default ProfileNavigator;