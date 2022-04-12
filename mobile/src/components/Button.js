import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import AppText from './AppText';

function Button({title, onPress, style, titleStyle, disable}) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7} disabled={disable}>
            <AppText style={[styles.title, titleStyle]}>{title}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: '100%',
        backgroundColor: colors.primary,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: colors.text_primary,
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default Button;