import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

function AppInput({title, style, ...otherProps}) {
    return (
        <TextInput
            placeholder={title}
            style={[styles.input, style]}
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
    }
})

export default AppInput;