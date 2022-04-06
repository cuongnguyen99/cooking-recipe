import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import AppText from '../components/AppText';
import ListingItem from '../components/ListingItem';
import colors from '../styles/colors';

import Screen from './Screen';
import Separator from '../components/Separator';

const resources = [
    {
        id: 1,
        content: '1 bịch bánh tráng'
    },
    {
        id: 2,
        content: '10 quả tắc/1 quả chanh'
    },
    {
        id: 3,
        content: 'Hành khô'
    },
    {
        id: 4,
        content: '1/2 quả xoài xanh'
    },
    {
        id: 5,
        content: 'Dầu ăn, xì dầu, ớt bột, đường, hạt nêm, giấm, nước màu'
    }
]

const steps = [
    {
        id: 1,
        step: 1,
        content: 'Bước một làm abc'
    },
    {
        id: 2,
        step: 2,
        content: 'Bước hai làm akljsdlaksjd'
    },
    {
        id: 3,
        step: 3,
        content: 'Bước ba làm alsjd,zmxc;lzkxc;lkz'
    },
    {
        id: 4,
        step: 4,
        content: 'Bước bốn làm ams,dnm,.zmxc.mzx.ckzjxlkzjxckljzxlkcj'
    },
]

function DetailScreen({navigation, route}) {

    const onBackPress = () => {
        navigation.goBack();
    }

    return (
        <Screen
            style={{paddingLeft: 0,
            paddingRight: 0}}
        >
            <ScrollView>
                <ImageBackground
                    source={{uri: 'https://ngonaz.com/wp-content/uploads/2021/09/cach-lam-ca-vien-chien-1.jpg'}}
                    style={styles.image}
                    resizeMode='cover'
                >
                    <View style={styles.overlay}/>
                    <ListingItem name='arrow-left' size={40} backgroundColor={colors.box_item} contentColor={colors.secondary} style={styles.backButton} 
                        onPress={onBackPress}
                    />
                </ImageBackground>
                <View style={styles.container}>
                    <AppText style={styles.title} numberOfLines={2} ellipsizeMode='tail'>Cá Viên Chiên Không Dầu</AppText>

                    {/* User */}
                    <View style={styles.user}>
                        <Image
                            style={styles.avatar}
                            source= {{uri: 'https://i.pinimg.com/564x/92/d8/ca/92d8ca5bdc13b99fcb8e1a0c9084cfd3.jpg'}}
                        />
                        <View style={{justifyContent: 'space-evenly', marginLeft: 10}}>
                            <AppText style={{fontWeight: '500', fontSize: 20}}>Mèo Sao Hoả</AppText>
                            <AppText style={{fontWeight: '300', fontSize: 16}}>meocute321</AppText>
                        </View>
                    </View>

                    {/* Resources */}
                    <Separator style={styles.separator}/>
                    <View style={styles.box_item}>
                        <AppText style={styles.sub_title}>Resources</AppText>
                        {
                            resources.map(item => {
                                return (
                                    <AppText style={styles.content}>+ {item.content}</AppText>
                                );
                            })
                        }
                    </View>

                    {/* Resources */}
                    <Separator style={styles.separator}/>
                    <View style={styles.box_item}>
                        <AppText style={styles.sub_title}>Steps</AppText>
                        {
                            steps.map(item => {
                                return (
                                    <View
                                     style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}
                                     key={item.id}
                                    >
                                        <ListingItem size={40} step={item.step} style={{marginRight: 10}}/>
                                        <AppText style={styles.content}>{item.content}</AppText>
                                    </View>
                                );
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 250
    },
    overlay: {
        backgroundColor: 'black',
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.2
    },
    backButton: {
        top: 10,
        left: 10
    },
    container: {
        padding: 10
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
    },
    user: {
        flexDirection: 'row',
        marginTop: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'black'
    },
    separator: {
        marginTop: 20,
        marginBottom: 30
    },
    box_item: {
        
    },
    sub_title: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 10
    },
    content: {
        fontSize: 20
    }
})

export default DetailScreen;