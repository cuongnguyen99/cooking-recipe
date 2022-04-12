import React from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import {animatedStyles, scrollInterpolator} from '../utils/animations';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AppText from '../components/AppText';
import ListingItem from '../components/ListingItem';
import colors from '../styles/colors';

import Screen from './Screen';
import Separator from '../components/Separator';
import Carousel from 'react-native-snap-carousel';

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

const images = [
    {
        id: 1,
        url: 'https://ngonaz.com/wp-content/uploads/2021/09/cach-lam-ca-vien-chien-1.jpg'
    },
    {
        id: 2,
        url: 'https://vietgle.vn/wp-content/uploads/2020/10/cach-lam-ca-vien-800x500-1.jpg'
    },
    {
        id: 3,
        url: 'https://images.foody.vn/res/g79/789094/prof/s576x330/foody-upload-api-foody-mobile-hmn-jpg-181025111824.jpg'
    },
    {
        id: 4,
        url: 'https://d1sag4ddilekf6.azureedge.net/compressed/merchants/VNGFVN000002br/hero/66a8657cb100483e906b984b50a7eaad_1571898323162358754.jpeg'
    },
    {
        id: 5,
        url: 'https://images.foody.vn/res/g104/1039545/prof/s1242x600/foody-upload-api-foody-mobile-img_2495-200731135420.jpg'
    },
    {
        id: 6,
        url: 'https://static.riviu.co/960/image/2021/03/15/79ae51891c103d12e9ebddfeafb9cc80_output.jpeg'
    }
]

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3/4);

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
                <View>
                    <Carousel
                        data={images}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <ImageBackground
                                source={{uri: item.url}}
                                style={styles.image}
                                resizeMode='cover'
                            >
                                <View style={styles.overlay}/>
                            </ImageBackground>
                        )}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        containerCustomStyle={styles.carouselContainer}
                        inactiveSlideShift={0}
                        scrollInterpolator={scrollInterpolator}
                        slideInterpolatedStyle={animatedStyles}
                        useScrollView={true}
                    />
                    <ListingItem name='arrow-left' size={40} backgroundColor={colors.box_item} contentColor={colors.secondary} style={styles.backButton} 
                                    onPress={onBackPress}
                    />
                    <Icon name='bookmark' size={40} style={styles.favorite} color={colors.text_primary} />
                </View>
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
        height: ITEM_HEIGHT
    },
    overlay: {
        backgroundColor: 'black',
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.2
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10
    },
    favorite: {
        position: 'absolute',
        top: 10,
        right: 10
    }
    ,
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
    },
})

export default DetailScreen;