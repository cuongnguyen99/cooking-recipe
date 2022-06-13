import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ListRecipeAcceptedScreen from '../screens/ListRecipeAcceptedScreen';
import ListRecipeNotAcceptedScreen from '../screens/ListRecipeNotAcceptedScreen';
import colors from '../styles/colors';

const TopTab = createMaterialTopTabNavigator();

function MyRecipeNavigator({}) {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarIndicatorStyle: {
                    backgroundColor: colors.primary
                },
                tabBarLabelStyle: {
                    fontSize: 16,
                    fontWeight: '500'
                },
                tabBarPressOpacity: 0.3,
                tabBarPressColor: colors.primary
            }}
        >
            <TopTab.Screen
                name='Accepted'
                component={ListRecipeAcceptedScreen}
            />
            <TopTab.Screen
                name='Not Accepted'
                component={ListRecipeNotAcceptedScreen}
            />
        </TopTab.Navigator>
    );
}

export default MyRecipeNavigator;