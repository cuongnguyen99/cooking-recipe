import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from  './SearchNavigator';
import AddNavigator from './AddNavigator';
import SaveNavigator from './SaveNavigator';
import ProfileNavigator from './ProfileNavigator';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createMaterialBottomTabNavigator();

function AppNavigator(props) {
    return (
        <Tab.Navigator
            activeColor={colors.text_primary}
            inactiveColor="#3e2465"
            barStyle={{
                backgroundColor: colors.primary,
            }}
            initialRouteName='HomeNavigator'
        >
            <Tab.Screen name='HomeNavigator' component={HomeNavigator} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused ,color}) => (<Icon name='home' size={24} color={color} />)
                }}
            />
            <Tab.Screen name='SearchNavigator' component={SearchNavigator} 
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({focused, color}) => (<Icon name='search' size={24} color={color} />)
                }}
            />
            <Tab.Screen name='AddNavigator' component={AddNavigator} 
                options={{
                    tabBarLabel: 'Create',
                    tabBarIcon: ({focused, color}) => (<Icon name='plus-circle' size={24} color={color} />)
                }}
            />
            <Tab.Screen name='SaveNavigator' component={SaveNavigator} 
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({focused, color}) => (<Icon name='bookmark' size={24} color={color} />)
                }}
            />
            <Tab.Screen name='ProfileNavigator' component={ProfileNavigator} 
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({focused, color}) => (<Icon name='user' size={24} color={color} />)
                }}
            />
        </Tab.Navigator>
    );
}

export default AppNavigator;