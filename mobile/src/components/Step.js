import React, { useEffect, useState } from 'react';
import {StyleSheet, TouchableHighlight, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AppInput from './AppInput';
import ListingItem from './ListingItem';

import colors from '../styles/colors';


function Step({item, index, onChangeText, onRemoveStep}) {

    if(index >= 1) {
        return (
            <View
            style={styles.step}
            key={index}
            >
                <ListingItem step={item.step_number} size={50} contentColor={colors.secondary} backgroundColor={colors.box_item}/>
                <AppInput title='Enter this step' style={{width: '78%', marginLeft: 5}}
                    value={item.step}
                    onChangeText={onChangeText}
                />
                <TouchableHighlight onPress={onRemoveStep} underlayColor={colors.buttonDisable} style={{borderRadius: 10}}>
                    <Icon name='x' size={28} color={colors.secondary}/>
                </TouchableHighlight>
            </View>
        );
    }

    return (
        <View
            style={styles.step}
            key={index}
            >
                <ListingItem step={item.step_number} size={50} contentColor={colors.secondary} backgroundColor={colors.box_item}/>
                <AppInput title='Enter this step' style={{width: '85%'}}
                    value={item.step}
                    onChangeText={onChangeText}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 10
    },
})

export default Step;