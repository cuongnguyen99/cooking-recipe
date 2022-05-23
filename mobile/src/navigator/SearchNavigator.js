import React from 'react';
import { Text } from 'react-native';
import Screen from '../screens/Screen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import DetailScreen from '../screens/DetailScreen';

const SearchStack = createNativeStackNavigator();

function SearchNavigator({navigation, route}) {
    return (
        <SearchStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <SearchStack.Screen
                name='Search'
                component={SearchScreen}
            />
            <SearchStack.Screen
                name='Detail'
                component={DetailScreen}
            />
        </SearchStack.Navigator>
    );
}

export default SearchNavigator;