import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import colors from '../styles/colors';

function UploadScreen({progress = 0, visible = false, onDone}) {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                {   progress < 1 ?
                    (<Progress.Bar progress={progress} width={200} color={colors.primary}/>)
                    :
                    (<LottieView
                        autoPlay
                        loop={false}
                        onAnimationFinish={onDone}
                        source={require("../assets/animation/done.json")}
                    />)
                }
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation: {
        width: 200
    }
})

export default UploadScreen;