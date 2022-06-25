import React, { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useValidation } from 'react-native-form-validator';

import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import Button from '../components/Button';
import Screen from './Screen';

import colors from '../styles/colors';
import userAPI from '../ultility/api/user';
import UploadScreen from '../components/UploadScreen';

function RegisterScreen({navigation, route}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [confirm, setConfirm] = useState("");
    const [passwordSecure, setPasswordSecure] = useState(true);
    const [confirmSecure, setConfirmSecure] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const { validate, isFieldInError, getErrorsInField, getErrorMessages } = 
        useValidation({state: {username, password, fullname, confirm}});

    const handleBack = () => {
        navigation.replace('App');
    }

    const handleSignup = async () => {
        setError(false);
        setErrorMessage("");
        const valid = validate({
            username: {minlength: 6, maxlength: 20, required: true},
            password: {minlength: 6, required: true},
            fullname: {required: true},
            confirm: {equalPassword: password},
        });
        if(valid) {
            setProgress(0);
            setUploadVisible(true);
            const result = await userAPI.signup(username, password, fullname, progress => setProgress(progress));
            if(!result.ok) {
                setError(true);
                setErrorMessage("User already exists!");
                setUploadVisible(false);
                return console.log(result.problem);
            }
            setFullname(""); setUsername(""); setPassword(""); setConfirm("");
            navigation.replace('Login');
        }
    }

    return (
        <Screen
            style={{
                justifyContent: 'center',
                flex: 1
            }}
        >
            <UploadScreen
                onDone={() => {
                    setUploadVisible(false)
                }}
                progress={progress}
                visible={uploadVisible}
            />
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
                    <View style={styles.inputBox}>
                        <AppInput title='Fullname' style={styles.input} onChangeText={text => setFullname(text)} onBlur={() => validate({fullname: {required: true}})}/>
                        {isFieldInError("fullname") && getErrorsInField("fullname").map(errMessage => (
                            <AppText style={styles.error}>{errMessage}</AppText>
                        ))}
                    </View>

                    <View style={styles.inputBox}>
                        <AppInput title='Username' style={styles.input} onChangeText={text => setUsername(text)} onBlur={() => validate({username: {minlength: 8, maxlength: 20, required: true}})}/>
                        {isFieldInError("username") && getErrorsInField("username").map(errMessage => (
                            <AppText style={styles.error}>{errMessage}</AppText>
                        ))}
                    </View>
                    {error? <AppText style={styles.error}>{errorMessage}</AppText> : null}

                    <View style={styles.inputBox}>
                        <AppInput title='Password' style={styles.input} secureTextEntry={passwordSecure} onChangeText={text => setPassword(text)} onBlur={() => validate({password: {minlength: 6, required: true}})}/>
                        {
                            passwordSecure ? <Icon name='eye-off' size={20} color={colors.text_secondary} style={styles.editable} onPress={() => setPasswordSecure(false)}/>
                            : <Icon name='eye' size={20} color={colors.text_secondary} style={styles.editable} onPress={() => setPasswordSecure(true)}/>
                        }
                        {isFieldInError("password") && getErrorsInField("password").map(errMessage => (
                            <AppText style={styles.error}>{errMessage}</AppText>
                        ))}
                    </View>

                    <View style={styles.inputBox}>
                        <AppInput title='Confirm Password' style={styles.input} secureTextEntry={confirmSecure} onChangeText={text => setConfirm(text)} onBlur={() => validate({confirm: {equalPassword: password}})}/>
                        {
                            confirmSecure ? <Icon name='eye-off' size={20} color={colors.text_secondary} style={styles.editable} onPress={() => setConfirmSecure(false)}/>
                            : <Icon name='eye' size={20} color={colors.text_secondary} style={styles.editable} onPress={() => setConfirmSecure(true)}/>
                        }
                        {isFieldInError("confirm") && getErrorsInField("confirm").map(errMessage => (
                            <AppText style={styles.error}>{errMessage}</AppText>
                        ))}
                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    <Button title='Sign Up' style={styles.button} onPress={handleSignup}/>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <AppText>You created your account? </AppText>
                        <TouchableOpacity onPress={() => {navigation.replace('Login')}}><AppText style={{color: colors.primary}}>Sign In</AppText></TouchableOpacity>
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
        marginTop: 120
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
        alignItems: 'center',
        paddingTop: 10
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
    },
    inputBox: {},
    editable: {
        position: 'absolute',
        right: 20,
        top: 35
    },
})

export default RegisterScreen;