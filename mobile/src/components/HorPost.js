import React from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';

function HorPost({mainImg,title, description, username, userImg, onPress, iconPress}) {
    
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
                <Image source={{uri: mainImg}} style={styles.mainImg}/>
                <View style={styles.overlay}/>
                <View style={styles.content}>
                    <AppText style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{title}</AppText>
                    <AppText style={styles.description} numberOfLines={3} ellipsizeMode='tail'>{description}</AppText>
                    <View style={styles.userContain}>
                        <Image source={{uri: userImg}} style={styles.userImg}/>
                        <AppText style={styles.username} >{username}</AppText>
                    </View>
                </View>
            </TouchableOpacity>
            <Icon name='bookmark' onPress={iconPress} size={32} style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 160,
        backgroundColor: colors.secondary,
        borderRadius: 15,
    },
    mainImg: {
        height: '100%',
        width: 180,
        overflow: 'hidden',
        borderRadius: 15
    },
    content: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between'
    },
    title: {
        color: colors.text_primary,
        fontWeight: 'bold',
        fontSize: 24,
        // flex: 0.3
    },
    description: {
        color: colors.text_secondary,
        fontSize: 14,
    },
    userContain: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    userImg: {
        height: 35,
        width: 35,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colors.text_primary
    },
    username: {
        color: colors.text_primary,
        fontSize: 14,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    icon: {
        position: 'absolute',
        color: colors.primary,
        top: 4,
        left: 4
    },
    overlay: {
        flex: 0.5,
        position: 'absolute',
        backgroundColor: 'black',
        height: '100%',
        width: 180,
        opacity: 0.3,
        borderRadius: 15
    }
})

export default HorPost;