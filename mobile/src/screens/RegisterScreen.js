import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import Button from '../components/Button';
import Screen from './Screen';

import colors from '../styles/colors';

function RegisterScreen({navigation, route}) {
    
    const handleBack = () => {
        navigation.replace('App');
    }

    return (
        <Screen
            style={{
                justifyContent: 'center',
                flex: 1
            }}
        >
            <TouchableHighlight style={styles.icon} onPress={handleBack} underlayColor={colors.buttonDisable}>
                <Icon name='x' size={35} color={colors.secondary}/>
            </TouchableHighlight>
            <Image
                source={require('../assets/image/logo.png')}
                style={styles.image}
                resizeMode='contain'
            />
            <View style={styles.inputContainer}>
                <AppInput title='Fullname' style={styles.input}/>
                <AppInput title='Username' style={styles.input}/>
                <AppInput title='Password' style={styles.input} secureTextEntry/>
                <AppInput title='Confirm Password' style={styles.input} secureTextEntry/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title='Sign In' style={styles.button}/>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <AppText>You created your account? </AppText>
                    <TouchableOpacity onPress={() => {navigation.replace('Login')}}><AppText style={{color: colors.primary}}>Sign In</AppText></TouchableOpacity>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 250,
        width: '100%',
        position: 'absolute',
        top: 40
    },
    inputContainer: {
        marginTop: 120
    },
    input: {
        borderWidth: 1,
        borderColor: colors.buttonDisable,
        marginBottom: 20,
        borderRadius: 30,
        paddingLeft: 15
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 80,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: 60
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 10,
    }
})

export default RegisterScreen;