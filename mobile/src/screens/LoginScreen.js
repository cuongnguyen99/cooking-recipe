import React, { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useValidation } from 'react-native-form-validator';

import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import Button from '../components/Button';
import Screen from './Screen';

import colors from '../styles/colors';
import userApi from '../ultility/api/user';

function LoginScreen({navigation, route}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const {validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: {username, password}
    });

    const handleBack = () => {
        navigation.replace('App');
    }

    const handleLogin = async () => {
        const valid = validate({
            username: {required: true},
            password: {required: true},
        });

        if(valid) {
            const result = await userApi.login(username, password);
            if(!result.ok) {
                return console.log("login fail!");
            }
            console.log("Data: ", result.data);
        }
    }

    return (
        <Screen
        style={{
            justifyContent: 'center',
            flex: 1
        }}
        >
            <KeyboardAvoidingView
                enabled={false}
                behavior="height"
                style={{flex: 1, justifyContent: 'center',}}
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
                    <AppInput title='Username' style={styles.input} value={username} onChangeText={text => setUsername(text)}/>
                    {isFieldInError("username") && getErrorsInField("username").map(errMessage => (
                        <AppText style={styles.error}>{errMessage}</AppText>
                    ))}

                    <AppInput title='Password' style={styles.input} value={password} secureTextEntry onChangeText={text => setPassword(text)}/>
                    {isFieldInError("password") && getErrorsInField("password").map(errMessage => (
                        <AppText style={styles.error}>{errMessage}</AppText>
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='Sign In' style={styles.button} onPress={handleLogin}/>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <AppText>You don't have an account? </AppText>
                        <TouchableOpacity onPress={() => {navigation.replace('Register')}}><AppText style={{color: colors.primary}}>Sign Up</AppText></TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        marginTop: 60
    },
    input: {
        borderWidth: 1,
        borderColor: colors.buttonDisable,
        marginTop: 20,
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
    },
    error: {
        color: "red",
        fontSize: 14,
        marginLeft: 15,
        marginTop: 2
    }
})

export default LoginScreen;