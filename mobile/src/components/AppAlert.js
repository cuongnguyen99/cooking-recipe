import React from 'react';
import {StyleSheet} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import colors from '../styles/colors';

function AppAlert({show, message, cancelText, confirmText, onCancelPressed, onConfirmPressed}) {
    return (
        <AwesomeAlert
            show = {show}
            message = {message}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText = {cancelText}
            confirmText = {confirmText}
            confirmButtonColor = {colors.primary}
            onCancelPressed = {onCancelPressed}
            onConfirmPressed = {onConfirmPressed}
            contentContainerStyle={styles.container}
            messageStyle={styles.message}
            cancelButtonStyle={styles.button}
            cancelButtonTextStyle={styles.button_text}
            confirmButtonStyle={styles.button}
            confirmButtonTextStyle={styles.button_text}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 600,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    message: {
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_text: {
        fontSize: 16,
        fontWeight: '500'
    }
})

export default AppAlert;