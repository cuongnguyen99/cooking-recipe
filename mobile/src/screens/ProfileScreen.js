import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import AppText from '../components/AppText';
import Button from '../components/Button';
import Listing from '../components/Listing';
import AuthNavigator from '../navigator/AuthNavigator';
import colors from '../styles/colors';
import AuthContext from '../ultility/context';
import AppLoading from './AppLoading';
import Screen from './Screen';

function ProfileScreen({navigation, route}) {
    const {user, accessToken, setUser, setAccessToken}= useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(!user) {
            navigation.replace("Auth");
        }
    }, []);

    useEffect(() => {
        checkAdmin();
    }, []);

    const checkAdmin = () => {
        const roleArr = user.roles;
        const check = roleArr.some(item => {
            return item.id == 2;
        });
        if(check) {
            setIsAdmin(true);
        }
    }

    const handleSignOut = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAccessToken('');
            setUser(null);
            navigation.replace("App");
        }, 2270);
    }

    return (
        <>
        <Screen style={styles.container}>
            <View style={styles.profile}>

                <View style={styles.imgContainer}>
                    <View style={styles.imgBorder}>
                        <Image  source={{uri: user?.image_url}} style={styles.image}/>
                    </View>
                </View>
                
                <View style={styles.content}>
                    <AppText style={styles.username}>{user.username}</AppText>
                    <AppText style={styles.fullname}>{user.fullname}</AppText>
                </View>
               
                <Listing title={'My Information'} icon={'info'} style={styles.listing} onPress={() => navigation.navigate("ChangeProfile")} />
                <Listing title={'Change Password'} icon={'lock'} style={styles.listing} onPress={() => navigation.navigate("ChangePassword")}/>
                {isAdmin ? 
                    <Listing title={'Manage Recipe'} icon={'clipboard'} style={styles.listing} onPress={() => {navigation.navigate("ListManage")}}/> 
                    : 
                    <Listing title={'My Recipe'} icon={'book'} style={styles.listing} onPress={() => {navigation.navigate("YourRecipe")}}/>
                }

            </View>
            <Button style={styles.button} title='Sign Out' onPress={handleSignOut}/>
        </Screen>
        {loading ? (<AppLoading/>) : null}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        position: 'relative',
        flex: 1
    },
    profile: {
        justifyContent: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        borderRadius: 15,
        paddingTop: 80,
        paddingBottom: 20
    },
    content: {
        alignItems: 'center',
        marginBottom: 60
    },
    imgContainer: {
        height: 140,
        width: '100%',
        position: 'absolute',
        top: -70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgBorder: {
        height: 148,
        width: 148,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 4,
        borderColor: colors.primary
    },
    image: {
        height: 140,
        width: 140,
        borderRadius: 100,
    },
    username: {
        color: colors.text_primary,
        fontSize: 20
    },
    fullname: {
        fontWeight: 'bold',
        color: colors.text_primary,
        fontSize: 28
    },
    listing: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20
    },
    button: {
        position: 'absolute',
        width: '80%',
        bottom: 60,
        backgroundColor: colors.secondary,
        alignSelf: 'center',
        height: 60
    }
})

export default ProfileScreen;