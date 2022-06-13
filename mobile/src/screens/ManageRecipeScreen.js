import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, View, TouchableHighlight } from 'react-native';
import {animatedStyles, scrollInterpolator} from '../utils/animations';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';

import AppText from '../components/AppText';
import ListingItem from '../components/ListingItem';
import colors from '../styles/colors';
import foodApi from '../ultility/api/food';

import Screen from './Screen';
import Separator from '../components/Separator';
import Carousel from 'react-native-snap-carousel';
import AuthContext from '../ultility/context';
import AppAlert from '../components/AppAlert';
import UploadScreen from '../components/UploadScreen';
import AppLoading from './AppLoading';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3/4);

function ManageRecipeScreen({navigation, route}) {
    const {user, accessToken} = useContext(AuthContext);
    const auth = useContext(AuthContext);
    const post = route.params.item;
    const images = post.images;
    const steps = post.steps;
    const resources = post.resources;
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [accept, setAccept] = useState(false);
    const [refuse, setRefuse] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerRight: () => (<HeaderButton/>)
        });
    }, [navigation]);
    
    const handleConfirmRecipe = async () => {
        setAccept(false);
        try {
            setProgress(0);
            setUploadVisible(true);
            let newPost = {...post};
            newPost.accepted = true;
            
            const result = await foodApi.updatePost(newPost, accessToken, progress => setProgress(progress));
            if(!result.ok) {
                console.log(rs.problem);
                setUploadVisible(false);
                return Toast.showWithGravity("Having some error! Please try later!", Toast.LONG, Toast.TOP);
            }
            setTimeout(() => {
                navigation.goBack();
            }, 4000);
        } catch (error) {
            setUploadVisible(false);
            console.error(error.message);
            return Toast.showWithGravity(error.message, Toast.LONG, Toast.TOP);
        }
    }

    const handleRefuseRecipe = async () => {
        setRefuse(false);
        try {
            setProgress(0);
            setUploadVisible(true);
            const result = await foodApi.deletePost(post.id, accessToken, progress => setProgress(progress));
            if(!result.ok) {
                console.log(result.problem);
                setUploadVisible(false);
                return Toast.showWithGravity("Having some error! Please try later!", Toast.LONG, Toast.TOP);
            }
            setTimeout(() => {
                navigation.goBack();
            }, 4000);
        } catch (error) {
            setUploadVisible(false);
            console.error(error.message);
            return Toast.showWithGravity(error.message, Toast.LONG, Toast.TOP);
        }
        
    }

    const HeaderButton = () => {
        return (
            <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.button} underlayColor={colors.text_secondary}
                    onPress={() => setAccept(true)}
                >
                    <Icon name='check' size={28} color={colors.text_black} />
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} underlayColor={colors.text_secondary}
                    onPress={() => setRefuse(true)}
                >
                    <Icon name='x' size={28} color={colors.text_black} />
                </TouchableHighlight>
            </View>
        );
    }

    return (
    <>
        <Screen
            style={{paddingLeft: 0, paddingRight: 0}}
        >
            <ScrollView>
                <View>
                    <Carousel
                        data={images}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <ImageBackground
                                source={{uri: item.imgUrl}}
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
                </View>
                <View style={styles.container}>
                    <AppText style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{post.post_name}</AppText>

                    {/* User */}
                    <View style={styles.user}>
                        <Image
                            style={styles.avatar}
                            source= {{uri: post.username.image_url}}
                        />
                        <View style={{justifyContent: 'space-evenly', marginLeft: 10}}>
                            <AppText style={{fontWeight: '500', fontSize: 20}}>{post.username.fullname}</AppText>
                            <AppText style={{fontWeight: '300', fontSize: 16}}>{post.username.username}</AppText>
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
        {
            accept ? <AppAlert show={accept} message={"Do you Agree to approve this Recipe?"} cancelText={"Cancel"} confirmText={"Agree"}
            onConfirmPressed={() => handleConfirmRecipe()}
            onCancelPressed={() => setAccept(false)}
            /> : null
        }
        {
            refuse ? <AppAlert show={refuse} message={"Do you Agree to refuse this Recipe?"} cancelText={"Cancel"} confirmText={"Refuse"}
            onConfirmPressed={handleRefuseRecipe}
            onCancelPressed={() => setRefuse(false)}
            /> : null
        }
        <UploadScreen
            onDone={() => setUploadVisible(false)}
            progress={progress}
            visible={uploadVisible}
        />
    </>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: "#000",
        width: 80
    },
    button: {
        borderRadius: 5
    }
})

export default ManageRecipeScreen;