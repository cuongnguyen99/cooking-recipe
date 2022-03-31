import React from 'react';
import { TouchableOpacity, View, StyleSheet, AppState } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../styles/colors';
import AppText from './AppText';

import ListingItem from './ListingItem';

function Listing({onPress, title, icon, style}) {
    return (
        <TouchableOpacity activeOpacity={0.7} style={[styles.container, style]} onPress={onPress}>
            <View style={styles.content}>
                <ListingItem size={40} name={icon} contentColor={colors.secondary} backgroundColor={colors.text_primary} />
                <AppText style={styles.title}>{title}</AppText>
            </View>
            <Icon size={30} name='chevron-right' color={colors.text_primary}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 30,
        paddingRight: 16
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: colors.text_primary,
        marginLeft: 30
    }
})

export default Listing;