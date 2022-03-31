import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import AppText from './AppText';

function Button({title, onPress, style}) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <AppText style={styles.title}>{title}</AppText>
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