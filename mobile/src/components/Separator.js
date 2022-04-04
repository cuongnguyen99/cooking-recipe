import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../styles/colors';

function Separator({style}) {
    return (
        <View
            style={[{
                backgroundColor: colors.secondary,
                height: 2,
                width: '100%'
            }, style]}
        />
    );
}

export default Separator;