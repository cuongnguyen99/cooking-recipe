import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import colors from '../styles/colors';

function ListingItem({step = null, size, name,  contentColor = colors.text_primary, backgroundColor = colors.secondary, style }) {
    return (
        <View
            style={[styles.container, {width: size, height: size, borderRadius: size/2, backgroundColor: backgroundColor}, style]}
        >
            {
                step ? (<Text style={{color: contentColor}}>{step}</Text>) :
                (<Icon name={name} size={size/2} color={contentColor}/>)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ListingItem;