import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import colors from '../styles/colors';

function ListingItem({step = null, size, name,  contentColor = colors.text_primary, backgroundColor = colors.secondary, style, onPress }) {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.container, {width: size, height: size, borderRadius: size/2, backgroundColor: backgroundColor}, style]}
            onPress={onPress}
        >
            {
                step ? (<Text style={{color: contentColor, fontSize: size/2}}>{step}</Text>) :
                (<Icon name={name} size={size/2} color={contentColor}/>)
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ListingItem;