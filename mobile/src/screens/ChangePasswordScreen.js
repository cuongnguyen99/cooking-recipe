import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Feather';
import { useValidation } from 'react-native-form-validator';

import AuthContext from '../ultility/context';
import Screen from './Screen';
import Button from '../components/Button';
import userApi from '../ultility/api/user';
import UploadScreen from '../components/UploadScreen';

function ChangePasswordScreen({navigation, route}) {
    const {user, accessToken, setUser} = useContext(AuthContext);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [newUser, setNewUser] = useState(user);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPassword, setCurrentPassword] = useState({
        secure: true,
        value: ""
    });
    const [password, setPassword] = useState({
        secure: true,
        value: ""
    });
    const [confirm, setConfirm] = useState({
        secure: true,
        value: ""
    });
    const [changed, setChanged] = useState();
    const { validate, isFieldInError, getErrorsInField, getErrorMessages } = useValidation({state: {
        confirm: confirm.value,
        password: password.value
    }});

    const handleChangePassword = async () => {
        const valid = validate({
            password: {minlength: 6, required: true},
            confirm: {equalPassword: password.value},
        });
        if(valid) {
            setProgress(0);
            setUploadVisible(true);
            const newUserUpdate = {...newUser}
            const checkPassword = await userApi.login(user.username, currentPassword.value);
            if(!checkPassword.ok) {
                setError(true);
                setErrorMessage("Current password is incorrect!");
                return;
            }
            newUserUpdate.password = password.value;
            setNewUser(newUserUpdate);
            
            const rs = await userApi.changePassword(newUserUpdate, accessToken, progress => setProgress(progress));
            if(!rs.ok) {
                console.log(rs.problem);
                setUploadVisible(false);
                return Toast.showWithGravity("Error when changing your password! Please try later!", Toast.LONG, Toast.TOP);
            }
            setUser(newUserUpdate);
            setTimeout(() => {
                navigation.goBack();
            }, 2000);
        }
    }

    useEffect(() => {
        if(currentPassword.value && password.value && confirm.value){
            setChanged(true);
        }
        else {
            setChanged(false);
        }
    }, [currentPassword, password, confirm]);

    const onSecureCurrentPassPress = () => {
        if(currentPassword.secure) {
            let temp = {...currentPassword};
            temp.secure = false;
            setCurrentPassword(temp);
        }
        else {
            let temp = {...currentPassword};
            temp.secure = true;
            setCurrentPassword(temp);
        }
    }
    const onSecurePassPress = () => {
        if(password.secure) {
            let temp = {...password};
            temp.secure = false;
            setPassword(temp);
        }
        else {
            let temp = {...password};
            temp.secure = true;
            setPassword(temp);
        }
    }
    const onSecureConfirmPress = () => {
        if(confirm.secure) {
            let temp = {...confirm};
            temp.secure = false;
            setConfirm(temp);
        }
        else {
            let temp = {...confirm};
            temp.secure = true;
            setConfirm(temp);
        }
    }

    const handleCurrentPasswordChange = (text) => {
        let temp = {...currentPassword};
        temp.value = text;
        setCurrentPassword(temp);
    }
    const handlePasswordChange = (text) => {
        let temp = {...password};
        temp.value = text;
        setPassword(temp);
    }
    const handleConfirmPasswordChange = (text) => {
        let temp = {...confirm};
        temp.value = text;
        setConfirm(temp);
    }

    return (
        <Screen
            style={styles.container}
        >
            <KeyboardAvoidingView
                enabled={false}
                behavior="height"
                style={{flex: 1,}}
            >
            <View style={styles.inputContain}>
                <AppText style={styles.label}>Current Password</AppText>
                <AppInput style={styles.input}
                    title="Enter your current password"
                    value={currentPassword.value}
                    secureTextEntry={currentPassword.secure}
                    onChangeText={(text) => handleCurrentPasswordChange(text)}
                />
                {currentPassword.secure ? 
                <Icon name='eye-off' size={24} color={colors.text_black} style={styles.editable} onPress={onSecureCurrentPassPress}/>
                : <Icon name='eye' size={24} color={colors.text_black} style={styles.editable} onPress={onSecureCurrentPassPress}/>
                }
                
            </View>
            {error? <AppText style={styles.error}>{errorMessage}</AppText> : null}
            <View style={styles.inputContain}>
                <AppText style={styles.label}>New Password</AppText>
                <AppInput style={styles.input}
                    title="Enter your new password"
                    value={password.value}
                    secureTextEntry={password.secure}
                    onChangeText={(text) => handlePasswordChange(text)}
                />
                {password.secure ? 
                <Icon name='eye-off' size={24} color={colors.text_black} style={styles.editable} onPress={onSecurePassPress}/>
                : <Icon name='eye' size={24} color={colors.text_black} style={styles.editable} onPress={onSecurePassPress}/>
                }
            </View>
            {isFieldInError("password") && getErrorsInField("password").map(errMessage => (
                <AppText style={styles.error}>{errMessage}</AppText>
            ))}
            <View style={styles.inputContain}>
                <AppText style={styles.label}>Confirm New Password</AppText>
                <AppInput style={styles.input}
                    title="Confirm new password"
                    value={confirm.value}
                    secureTextEntry={confirm.secure}
                    onChangeText={(text) => handleConfirmPasswordChange(text)}
                />
                {confirm.secure ? 
                <Icon name='eye-off' size={24} color={colors.text_black} style={styles.editable} onPress={onSecureConfirmPress}/>
                : <Icon name='eye' size={24} color={colors.text_black} style={styles.editable} onPress={onSecureConfirmPress}/>
                }
            </View>
            {isFieldInError("confirm") && getErrorsInField("confirm").map(errMessage => (
                <AppText style={styles.error}>{errMessage}</AppText>
            ))}

            {
                changed ? (<Button style={styles.button} title='Update' onPress={handleChangePassword}/>)
                : (<Button style={styles.buttonDisable} title='Update' disable={true}/>)
            }
            </KeyboardAvoidingView>
            <UploadScreen
                onDone={() => {
                    setUploadVisible(false);
                }}
                progress={progress}
                visible={uploadVisible}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: '80%',
        bottom: 60,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        height: 50
    },
    buttonDisable: {
        position: 'absolute',
        width: '80%',
        bottom: 60,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        height: 50,
        backgroundColor: colors.buttonDisable
    },
    icon: {
        alignSelf: 'center',
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        backgroundColor: "transparent",
        paddingLeft: 0
    },
    inputContain: {
        marginTop: 40
    },
    label: {
        fontSize: 16,
        color: colors.text_black,
        fontWeight: '600'
    },
    editable: {
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    container: {
        position: 'relative',
        flex: 1
    },
    error: {
        color: "red",
        fontSize: 14,
        marginLeft: 15,
        marginTop: 2
    }
})

export default ChangePasswordScreen;