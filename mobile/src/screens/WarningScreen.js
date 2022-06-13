import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from '../components/AppText';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../styles/colors';

function WarningScreen({}) {
    return (
        <View style={[ StyleSheet.absoluteFillObject, styles.container]}>
            <View style={styles.contentContainer}>
                <Icon name='alert-triangle' size={32} color={colors.text_black}/>
                <AppText style={styles.text}>Oops! You can't use this feature!</AppText>
                <Icon name='alert-triangle' size={32} color={colors.text_black}/>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1
    },
    contentContainer: {
        backgroundColor: colors.background,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 200,
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        marginRight: 5,
        marginLeft: 5,
        fontSize: 20,
        fontWeight: '600'
    }
});
export default WarningScreen;