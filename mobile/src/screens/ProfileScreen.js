import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../components/AppText';
import Button from '../components/Button';
import Listing from '../components/Listing';
import AuthNavigator from '../navigator/AuthNavigator';
import colors from '../styles/colors';
import AppLoading from './AppLoading';
import Screen from './Screen';
import { logout } from '../feature/auth-slice';
import { removeUser } from '../feature/user-slice';

function ProfileScreen() {
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const user = useSelector((state) => state.user_slice.user);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if(user) {
            checkAdmin();
        }
    }, [route]);

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
            dispatch(removeUser());
            dispatch(logout());
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
                    <AppText style={styles.username}>{user?.username}</AppText>
                    <AppText style={styles.fullname}>{user?.fullname}</AppText>
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
        flex: 1,
        paddingTop: 40
    },
    profile: {
        justifyContent: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        borderRadius: 15,
        paddingTop: 80,
        paddingBottom: 20,
        marginBottom: 20
    },
    content: {
        alignItems: 'center',
        marginBottom: 40
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
        width: '80%',
        backgroundColor: colors.secondary,
        alignSelf: 'center',
        height: 60,
    }
})

export default ProfileScreen;