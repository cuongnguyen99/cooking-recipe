import React from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import AppText from './AppText';

function NewFood({title, image, avatar, onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.5}>
            <ImageBackground resizeMode='cover' source={{uri: image}} style={styles.image}>
                <View style={styles.layout}>
                </View>
                <Image style={styles.avatar} source={{uri: avatar}}/>
                <AppText style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{title}</AppText>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 130,
        borderRadius: 10,
        marginRight: 10
    },
    layout: {
        backgroundColor: 'black',
        position: 'absolute',
        width: "100%",
        height: "100%",
        opacity: 0.3,
        borderRadius: 10
    }
    ,
    image: {
        borderRadius: 10,
        flex: 1,
        overflow: 'hidden',
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.primary,
        position: 'absolute',
        top: 10,
        left: 10
    },
    title: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: colors.text_primary,
        fontWeight: 'bold',
        width: '80%'
    }
})

export default NewFood;