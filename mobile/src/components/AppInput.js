import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../styles/colors';

function AppInput({title, style, ...otherProps}) {
    return (
        <TextInput
            placeholder={title}
            style={[styles.input, style]}
            placeholderTextColor={colors.text_secondary}
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: colors.box_item,
        color: colors.text_black,
        borderRadius: 15,
        paddingLeft: 10,
        fontSize: 16,
    }
})

export default AppInput;