import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

function AppText({children, style, ...otherProps}) {
    return (
        <Text ellipsizeMode='head' style={[styles.text, style]} {...otherProps}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        color: colors.text_black,
        fontSize: 18,
    }
})

export default AppText;