import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../styles/colors';
import AppText from './AppText';

function HeaderNavigate({title, style, onPress}) {
    return (
        <View style={[styles.container, style]}>
            <AppText style={styles.text}>{title}</AppText>
            <TouchableOpacity onPress={onPress} activeOpacity={0.3}>
                <Icon name='arrow-right' size={30} color={colors.secondary} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 25
    },
    icon: {
        fontWeight: 'bold'
    }
})

export default HeaderNavigate;