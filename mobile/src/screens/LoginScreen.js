import React, { useState, useContext } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useValidation } from 'react-native-form-validator';
import jwtDecode from 'jwt-decode';
import Toast from 'react-native-simple-toast';

import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import Button from '../components/Button';
import Screen from './Screen';

import colors from '../styles/colors';
import userApi from '../ultility/api/user';
import AppLoading from './AppLoading';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {login} from '../feature/auth-slice';
import {setUser} from '../feature/user-slice';

function LoginScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secure, setSecure] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    const {validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: {username, password}
    });

    const handleBack = () => {
        navigation.replace('App');
    }

    const handleLogin = async () => {
        try {
            setError(false);
            setErrorMessage("");
            const valid = validate({
                username: {required: true},
                password: {required: true},
            });
    
            if(valid) {
                setLoading(true);
                const result = await userApi.login(username, password);
                if(!result.ok) {
                    setError(true);
                    setErrorMessage("Username or password is incorrect!")
                    setLoading(false);
                    return console.log("login fail!");
                }
                const access_token = result.data.access_token;
                const userInfor = jwtDecode(result.data.access_token);
                const userData = await userApi.getUser(userInfor.sub, access_token);
                if(!userData.ok) {
                    Toast.showWithGravity("Error when getting user's information! " + result.problem, Toast.LONG, Toast.BOTTOM);
                    setLoading(false);
                    return console.error("Error when login!");
                }
                const user = userData.data;
                dispatch(login(access_token));
                dispatch(setUser(user));
                setLoading(false);
                navigation.replace("App");
            }
        } catch (error) {
            console.log(error);
            Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
        }
    }

    return (
        <>
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
                    <View style={styles.inputBox}>
                        <AppInput title='Username' style={styles.input} value={username} onChangeText={text => setUsername(text)} onBlur={() => validate({username: {required: true}})}/>
                        {isFieldInError("username") && getErrorsInField("username").map(errMessage => (
                            <AppText style={styles.error}>{errMessage}</AppText>
                        ))}
                    </View>
                    {error? <AppText style={styles.error}>{errorMessage}</AppText> : null}

                    <View style={styles.inputBox}>
                        <AppInput title='Password' style={styles.input} value={password} secureTextEntry={secure} onChangeText={text => setPassword(text)} onBlur={() => validate({password: {required: true}})}/>
                        {
                            secure ? <Icon name='eye-off' size={20} color={colors.text_secondary} style={styles.editable} onPress={() => setSecure(false)}/>
                            : <Icon name='eye' size={20} color={colors.text_secondary} style={styles.editable} onPress={() => setSecure(true)}/>
                        }
                        {isFieldInError("password") && getErrorsInField("password").map(errMessage => (
                            <AppText style={styles.error}>{errMessage}</AppText>
                        ))}
                    </View>
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
        {loading ? (<AppLoading/>) : null}
        </>
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
    },
    inputBox: {},
    editable: {
        position: 'absolute',
        right: 20,
        top: 35
    },
})

export default LoginScreen;