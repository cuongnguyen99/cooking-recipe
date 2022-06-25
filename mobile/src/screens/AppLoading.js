import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../styles/colors';

function AppLoading({}) {
    return (
        <View style={[ StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView
                source={require('../assets/animation/loading.json')}
                autoPlay
                loop
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        zIndex: 1
    }
})
export default AppLoading;