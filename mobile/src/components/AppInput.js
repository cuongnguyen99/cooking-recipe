import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../styles/colors';

function AppInput({title, style,onChangeText, value, onSubmitEditing, ...otherProps}) {
    return (
        <TextInput
            placeholder={title}
            style={[styles.input, style]}
            placeholderTextColor={colors.text_secondary}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
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
        borderWidth: 1,
        borderColor: colors.buttonDisable
    }
})

export default AppInput;