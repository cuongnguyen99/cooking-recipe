import React, {useState, useEffect, useContext} from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, View, TouchableHighlight, BackHandler } from 'react-native';
import {animatedStyles, scrollInterpolator} from '../utils/animations';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';

import AppText from '../components/AppText';
import ListingItem from '../components/ListingItem';
import colors from '../styles/colors';
import userAPI from '../ultility/api/user';
import foodAPI from '../ultility/api/food';

import Screen from './Screen';
import Separator from '../components/Separator';
import Carousel from 'react-native-snap-carousel';
import AuthContext from '../ultility/context';
import AppAlert from '../components/AppAlert';
import AppLoading from './AppLoading';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3/4);

function RecipeAcceptedScreen({navigation, route}) {
    const {user, accessToken} = useContext(AuthContext);
    const auth = useContext(AuthContext);
    const post = route.params.item;
    const images = post.images;
    const steps = post.steps;
    const resources = post.resources;
    const [currentIndex, setCurrenIndex] = useState(1);
    const [accept, setAccept] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<HeaderRightButton/>)
        });
    }, []);

    const handleDeleteRecipe = async () => {
        setAccept(false);
        try {
            setLoading(true);
            const result = await foodAPI.deletePost(post.id, accessToken);
            if(!result.ok) {
                console.log(result.problem);
                setUploadVisible(false);
                return Toast.showWithGravity("Having some error! Please try later!", Toast.LONG, Toast.TOP);
            }
            else if(result.ok) {
                setTimeout(() => {
                    setLoading(false);
                    Toast.showWithGravity("Delete Successfully!", Toast.LONG, Toast.TOP);
                }, 3000);
                setTimeout(() => {
                    navigation.goBack();
                }, 5000);
            }
        } catch (error) {
            setLoading(false);
            console.error(error.message);
            return Toast.showWithGravity(error.message, Toast.LONG, Toast.TOP);
        }
    }

    const HeaderRightButton = () => {
        return(
            <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.delete_button} underlayColor={colors.text_secondary}
                    onPress={() => setAccept(true)}
                >
                    <Icon name='trash-2' size={26} color={colors.text_black} />
                </TouchableHighlight>
            </View>
        );
    }

    return (
        <>
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
                        onSnapToItem={(index) => setCurrenIndex(index+1)}
                    />
                    <View style={styles.imageIndex}>
                        <AppText style={styles.index}>{currentIndex}/{images?.length}</AppText>
                    </View>
                </View>
                <View style={styles.container}>
                    <AppText style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{post.post_name}</AppText>

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
            accept ? <AppAlert show={accept} message={"Do you exactly wanna delete this recipe?"} cancelText={"No"} confirmText={"Yes"}
            onCancelPressed={() => {setAccept(false)}}
            onConfirmPressed={handleDeleteRecipe}
            /> : null
        }
        {
            loading ? <AppLoading/> : null
        }
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
        alignItems: 'center',
        marginRight: 5,
    },
    delete_button: {
        borderRadius: 5
    },
    imageIndex: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        padding: 2,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 15
    },
    index: {
        fontSize: 14
    }
});

export default RecipeAcceptedScreen;