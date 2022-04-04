import React, { useState } from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import colors from '../styles/colors';
import Screen from './Screen';
import AppText from '../components/AppText';
import Icon from 'react-native-vector-icons/Feather';
import AppInput from '../components/AppInput';
import Separator from '../components/Separator';
import ListingItem from '../components/ListingItem';
import Button from '../components/Button';

function AddScreen({}) {
    const [desHeight, setDesHeight] = useState(30);

    const handleImage = () => {
        console.log('Image click');
    }

    const handleAddResource = () => {
        console.log('Add Resource');
    }

    const handleAddStep = () => {
        console.log('Add Step');
    }

    const handleRemoveResource = () => {
        console.log('Remove resource');
    }

    const handleRemoveStep = () => {
        console.log('Remove step');
    }

    const Resource = () => {
        return (
            <View
                style={styles.resource}
            >
                <AppInput title='Enter this resource' style={{width: '90%'}} />
                <Icon name='x' size={28} color={colors.secondary} onPress={handleRemoveResource}/>
            </View>
        );
    }

    const Step = ({number, size}) => {
        return (
            <View
                style={styles.resource}
            >
                <ListingItem step={number} size={size} contentColor={colors.secondary} backgroundColor={colors.box_item}/>
                <AppInput title='Enter this step' style={{width: '78%'}} />
                <Icon name='x' size={28} color={colors.secondary} onPress={handleRemoveResource}/>
            </View>
        );
    }

    return (
        <Screen style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Image */}
                <View style={styles.imageContainer}>
                    <ImageBackground
                        source={{uri: 'https://cdn.w600.comps.canstockphoto.com/seamless-background-with-hand-drawn-food-image_csp35091073.jpg'}}
                        style={styles.image}
                    >
                        <View
                            style={styles.overlay}
                        >
                        </View>      
                        <TouchableWithoutFeedback style={styles.imageContent} onPress={handleImage}>
                            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20}}>
                                <Icon name='camera' size={24} color={colors.text_primary} style={{marginRight: 10}} />
                                <AppText style={{color: colors.background, fontWeight: 'bold', fontSize: 20}}>Import recipe's image here</AppText>
                            </View>
                        </TouchableWithoutFeedback>
                    </ImageBackground>
                </View>

                {/* About Food */}
                <View style={styles.aboutFood} >
                    <AppInput title='Food name' style={styles.input}/>
                    <AppInput title='Description about your food' style={[styles.input, {height: 100}]} multiline={true} />
                </View>

                {/* Resources */}
                <View style={styles.aboutFood} >
                    <Separator style={styles.separator}/>
                    <AppText style={styles.title}>Resources</AppText>
                    <Resource/>
                    
                    <TouchableWithoutFeedback style={styles.imageContent} onPress={handleAddResource}>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                            <Icon name='plus-square' size={26} color={colors.text_black} style={{marginRight: 10}} />
                            <AppText style={{color: colors.secondary, fontSize: 18}}>Add New Recource</AppText>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* Step */}
                <View style={styles.aboutFood} >
                    <Separator style={styles.separator}/>
                    <AppText style={styles.title}>Steps</AppText>

                    <Step number={1} size={40} />
                    
                    <TouchableWithoutFeedback style={styles.imageContent} onPress={handleAddStep}>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                            <Icon name='plus-square' size={26} color={colors.text_black} style={{marginRight: 10}} />
                            <AppText style={{color: colors.secondary, fontSize: 18}}>Add New Recource</AppText>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* Button */}
                <Button style={styles.button} title='Create' titleStyle={{fontSize: 20, fontWeight: 'normal'}}/>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        position: 'relative',
        paddingLeft: 0,
        paddingRight: 0
    },
    imageContainer: {

    },  
    image: {
        height: 220,
        width: '100%'
    },
    overlay: {
        backgroundColor: '#000',
        height: 220,
        width: '100%',
        position: 'absolute',
        opacity: 0.5,
    },
    imageContent: {
    },
    aboutFood: {
        marginLeft: 15,
        marginRight: 15
    },
    input: {
        marginTop: 15,
        alignItems: 'flex-start',
        textAlignVertical: 'top'
    },
    separator: {
        marginTop: 30,
        marginBottom: 10
    },
    resource: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    button: {
        alignSelf: 'center',
        width: '60%',
        height: 40,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    title: {
        fontWeight: '600',
        fontSize: 24,
        marginBottom: 20
    }
})

export default AddScreen;