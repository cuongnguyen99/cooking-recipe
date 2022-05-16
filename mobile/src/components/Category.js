import React from 'react';
import { View, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../styles/colors';

function Category({image, title, onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.5}>
            <ImageBackground resizeMode='cover' source={{uri: image}} style={styles.image}>
                <View style={styles.layout}>
                </View>
                {/* <AppText style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{title}</AppText> */}
                <View style={styles.subtitleContainer}>
                    <AppText style={styles.subtitle}>More Information</AppText>
                    <Icon name='chevron-right' size={20} color={colors.text_primary} />
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 230,
        backgroundColor: colors.secondary,
        borderRadius: 10
    },
    image: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 10
    },
    title: {
        position: 'absolute',
        bottom: 45,
        left: 10,
        color: colors.text_primary,
        fontWeight: 'bold',
        fontSize: 26
    },
    subtitleContainer: {
        flexDirection:  'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 10
    },
    subtitle: {
        color: colors.text_primary,
        marginRight: 5
    },
    layout: {
        backgroundColor: 'black',
        position: 'absolute',
        width: "100%",
        height: '100%',
        opacity: 0.3,
        borderRadius: 10
    }
})

export default Category;