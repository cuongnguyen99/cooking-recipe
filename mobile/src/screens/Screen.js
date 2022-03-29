import React from 'react';
import { StatusBar, View, StyleSheet, SafeAreaView } from 'react-native';

import colors from '../styles/colors';

function Screen({children, style}) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primary} barStyle='default'/>
            <View style={[style]}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10
    }
})

export default Screen;