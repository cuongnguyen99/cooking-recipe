import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import { useValidation } from 'react-native-form-validator';
import api from 'apisauce';

import colors from '../styles/colors';
import AuthContext from '../ultility/context';
import Screen from './Screen';
import Button from '../components/Button';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import UploadScreen from '../components/UploadScreen';
import userApi from '../ultility/api/user';

function UpdateProfileScreen({navigation, route}) {
    const {user, accessToken, setUser} = useContext(AuthContext);
    const [newUser, setNewUser] = useState(user);
    const [image, setImage] = useState();
    const [changed, setChanged] = useState(false);
    const [fullname, setFullname] = useState(newUser.fullname);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const { validate, isFieldInError, getErrorsInField, getErrorMessages } = useValidation({state: {}})

    useEffect(() => {
        if(newUser.fullname != user.fullname) {
            setChanged(true);
        }
        else if (image) {
            setChanged(true);
        }
        else {
            setChanged(false);
        }
    }, [newUser, image]);

    const handleUpdateProfile = async () => {
       const valid = validate({
            fullname: {required: true}
       });
       if(valid) {
            setProgress(0);
            setUploadVisible(true);
            const newUserUpdate = {...newUser}

            if(image) {
                const imageApi = api.create({baseURL: "https://api.cloudinary.com/v1_1/mycooknltc/"});
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "bnkilven");
                const result = await imageApi.post("image/upload", data);
                if(!result.ok) {
                    console.log(result.problem);
                    setUploadVisible(false);
                    return Toast.showWithGravity("Error when uploading image to server! Please try later!", Toast.LONG, Toast.TOP);
                }
                newUserUpdate.image_url = result.data.url;
            }

            newUserUpdate.fullname = fullname;
            console.log(newUserUpdate);
            setNewUser(newUserUpdate);

            const rs = await userApi.saveUser(newUserUpdate, accessToken, progress => setProgress(progress));
            if(!rs.ok) {
                console.log(rs.problem);
                setUploadVisible(false);
                return Toast.showWithGravity("Error when updating your profile! Please try later!", Toast.LONG, Toast.TOP);
            }
            setUser(newUserUpdate);
            setTimeout(() => {
                navigation.goBack();
            }, 2000);
       }
    }

    const onFullNameChange = (text) => {
        const textChanged = text;
        setFullname(textChanged);
        const newUserUpdate = {...newUser};
        newUserUpdate.fullname = textChanged;
        setNewUser(newUserUpdate);
    }

    const onImagePickerPress = () => {
        ImageCropPicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            const temp = image.path.split("/");
            const filename = temp[temp.length - 1];
            const newImage = {
                name: filename,
                uri: image.path,
                type: `image/${image.path.split(".")[2]}`,
            }
            setImage(newImage);
        })
        .catch(err => {
            console.log(err.message);
            Toast.showWithGravity(err.message + "... Please try again!", Toast.LONG, Toast.TOP);
        });
    }

    return (
        <Screen style={styles.container}>
            <UploadScreen
                onDone={() => {
                    setUploadVisible(false);
                }}
                progress={progress}
                visible={uploadVisible}
            />
            <View style={styles.profile}>

                <View style={styles.imgContainer}>
                    <View style={styles.imgBorder}>
                        <ImageBackground 
                            source={image ? {uri: image.uri} : {uri: user?.image_url}}
                            style={{height: 140, width: 140}}
                            imageStyle={styles.image}
                        >
                            <View style={styles.iconContainer}>
                                <Icon name='camera' size={30} color={colors.text_primary} style={styles.icon} onPress={onImagePickerPress}/>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                
                <View style={styles.infor}>
                    <View style={styles.inputContain}>
                        <AppText style={styles.label}>Username</AppText>
                        <AppInput style={styles.input} editable={false} value={newUser.username}/>
                    </View>
                    <View style={styles.inputContain}>
                        <AppText style={styles.label}>Fullname</AppText>
                        <AppInput style={styles.input} value={fullname} onChangeText={text => onFullNameChange(text)}/>
                        {isFieldInError("fullname") && getErrorsInField("fullname").map(errMessage => (
                            <AppText style={styles.error}>{errMessage}</AppText>
                        ))}
                        <Icon name='edit' size={24} color={colors.text_black} style={styles.editable}/>
                    </View>
                </View>
            </View>
            {
                changed ? (<Button style={styles.button} title='Update' onPress={handleUpdateProfile}/>)
                : (<Button style={styles.buttonDisable} title='Update' onPress={handleUpdateProfile} disable={true}/>)
            }
            
        </Screen>
    );
}

export default UpdateProfileScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        position: 'relative',
        flex: 1
    },
    profile: {
        justifyContent: 'center',
        width: '100%',
        borderRadius: 15,
        paddingTop: 10,
        paddingBottom: 20
    },
    imgContainer: {
        height: 140,
        width: '100%',
        position: 'absolute',
        top: -200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBorder: {
        height: 148,
        width: 148,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderColor: colors.primary,
    },
    image: {
        borderRadius: 100
    },
    button: {
        position: 'absolute',
        width: '80%',
        bottom: 60,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        height: 60
    },
    buttonDisable: {
        position: 'absolute',
        width: '80%',
        bottom: 60,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        height: 60,
        backgroundColor: colors.buttonDisable
    },
    infor: {

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
        backgroundColor: "transparent"
    },
    inputContain: {
        marginTop: 40
    },
    label: {
        fontSize: 16,
        marginLeft: 10,
        color: colors.text_secondary
    },
    editable: {
        position: 'absolute',
        right: 10,
        bottom: 10
    }
})