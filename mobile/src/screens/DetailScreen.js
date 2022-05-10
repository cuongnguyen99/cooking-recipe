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

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3/4);

function DetailScreen({navigation, route}) {
    const post = route.params.item;
    const images = post.images;
    const steps = post.steps;
    const resources = post.resources;
    const user = post.username;

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
                                source={{uri: item.img_url}}
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
                    <AppText style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{post.post_name}</AppText>

                    {/* User */}
                    <View style={styles.user}>
                        <Image
                            style={styles.avatar}
                            source= {{uri: user.image_url}}
                        />
                        <View style={{justifyContent: 'space-evenly', marginLeft: 10}}>
                            <AppText style={{fontWeight: '500', fontSize: 20}}>{user.fullname}</AppText>
                            <AppText style={{fontWeight: '300', fontSize: 16}}>{user.username}</AppText>
                        </View>
                    </View>

                    {/* Description */}
                    <Separator style={styles.separator}/>
                    <View style={styles.box_item}>
                        <AppText style={styles.sub_title}>Description</AppText>
                        <AppText>{post.description}</AppText>
                    </View>

                    {/* Resources */}
                    {/* <Separator style={styles.separator}/> */}
                    <Separator style={styles.separator} />
                    <View style={styles.box_item}>
                        <AppText style={styles.sub_title}>Ingredients</AppText>
                        {
                            resources.map(item => {
                                return (
                                    <AppText style={styles.content} key={item.id}>+ {item.description}</AppText>
                                );
                            })
                        }
                    </View>

                    {/* Steps */}
                    <Separator style={styles.separator}/>
                    <View style={styles.box_item}>
                        <AppText style={styles.sub_title}>Steps</AppText>
                        {
                            steps.map(item => {
                                return (
                                    <View
                                     style={{flexDirection: 'row', marginBottom: 20, alignItems: 'flex-start', paddingRight: 10}}
                                     key={item.id}
                                    >
                                        <ListingItem size={40} step={item.stepNumber} style={{marginRight: 10}}/>
                                        <AppText style={styles.content}>{item.description}</AppText>
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
        marginBottom: 30,
    },
    box_item: {
        
    },
    sub_title: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 10
    },
    content: {
        fontSize: 20,
        width: "88%"
    },
})

export default DetailScreen;