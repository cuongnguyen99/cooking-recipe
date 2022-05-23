import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import AppText from '../components/AppText';
import Button from '../components/Button';
import Listing from '../components/Listing';
import AuthNavigator from '../navigator/AuthNavigator';
import colors from '../styles/colors';
import AuthContext from '../ultility/context';
import Screen from './Screen';

const items = [
    {
        content: 'My Information',
        name: 'info'
    },
    {
        content: 'My Recipe',
        name: 'book'
    },
    {
        content: 'Policy',
        name: 'clipboard'
    },
];

function ProfileScreen({navigation, route}) {
    const {user, accessToken, setUser}= useContext(AuthContext);

    useEffect(() => {
        if(!user) {
            navigation.replace("Auth");
        }
    }, []);

    const handleSignOut = () => {
        setUser(null);
        navigation.replace("App");
    }

    return (
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
                
                <FlatList
                    data={items}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <Listing title={item.content} icon={item.name} style={styles.listing}/>
                    )}
                />

            </View>
            <Button style={styles.button} title='Sign Out' onPress={handleSignOut}/>
        </Screen>
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