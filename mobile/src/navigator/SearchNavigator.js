import React from 'react';
import { Text } from 'react-native';
import Screen from '../screens/Screen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';

const SearchStack = createNativeStackNavigator();

function SearchNavigator(props) {
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
        </SearchStack.Navigator>
    );
}

export default SearchNavigator;