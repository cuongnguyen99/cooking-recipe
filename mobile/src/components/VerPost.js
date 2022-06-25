import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableHighlight, Image } from 'react-native';
import colors from '../styles/colors';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/MaterialIcons';

const heightProduct = 270;
const heightImg = (heightProduct/100)*60;

function VerPost({image, title, userImg, username, onItemPress, onSavePress, onIconPress, style}) {
    return (
        <View style={[styles.product, style]}>
            <TouchableHighlight 
                style={styles.productBox} 
                activeOpacity={0.78}  
                onPress={onItemPress}
            >
                <View style={styles.productInner}>
                    <Image 
                        source={{uri: image}} 
                        style={styles.productImage} 
                        resizeMode='cover'
                    />
                    <View style={styles.overlay}/>
                    <View style={styles.productContent}>
                        <AppText style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{title}</AppText>
                        <View style={styles.user}>
                            <Image 
                                source={{uri: userImg}}
                                style={styles.userImg}
                            />
                            <AppText style={styles.username} numberOfLines={1} ellipsizeMode='tail'>{username}</AppText>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    product:{
        backgroundColor: colors.background,
        width: "50%",
        height: heightProduct,
        padding: 5,
    },
    productBox:{
        backgroundColor: colors.box_item,
        flex:1,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 4
    },
    productImage: {
        width: "100%",
        height: heightImg,
    },
    productInner: {
        backgroundColor: colors.box_item,
        flex: 1,
    },
    productContent: {
        backgroundColor: colors.box_item,
        width: "100%",
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 5,
        paddingTop: 2
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'left',
        width: '100%',
        flex: 2
    },
    user: {
        width: '100%',
        flexDirection: 'row',
        overflow: 'scroll',
        flex: 1
    },
    userImg: {
        height: 25,
        width: 25,
        borderRadius: 100,
        flex: 0.15
    },
    username: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '400',
        flex: 0.8
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: colors.primary
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: heightImg,
        backgroundColor: 'black',
        opacity: 0.3
    }
})

export default VerPost;