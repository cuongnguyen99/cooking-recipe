import React from 'react';
import { StatusBar, View, StyleSheet, SafeAreaView } from 'react-native';

import colors from '../styles/colors';

function Screen({children, style}) {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.background}/>
            <View style={[style]}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        // paddingTop: StatusBar.currentHeight,
        paddingLeft: 15,
        paddingRight: 15
    }
})

export default Screen;