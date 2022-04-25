import React, { useEffect, useState } from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../styles/colors';
import AppInput from './AppInput';

function Resource({item, index, onChangeText, onRemoveResource}) {
    if(index >= 1) {
        return (
            <View
                style={styles.resource}
                key={index}
                >
                <AppInput title='Enter this resource' style={{width: '90%'}}
                    value={item.resource}
                    onChangeText={onChangeText}
                />
                <TouchableHighlight onPress={onRemoveResource} underlayColor={colors.buttonDisable} style={{borderRadius: 10}}>
                    <Icon name='x' size={28} color={colors.secondary} />
                </TouchableHighlight>
            </View>
        );
    }

    return (
        <View
            style={styles.resource}
            key={index}
        >
            <AppInput title='Enter this resource' style={{width: '100%'}}
                value={item.resource}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    resource: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 10
    }
})

export default Resource;