import React, {useState, useEffect, useContext} from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, View, FlatList} from 'react-native';
import {animatedStyles, scrollInterpolator} from '../utils/animations';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';

import AppText from '../components/AppText';
import ListingItem from '../components/ListingItem';
import VerPost from '../components/VerPost';
import colors from '../styles/colors';
import userAPI from '../ultility/api/user';
import foodAPI from '../ultility/api/food';
import { create } from 'apisauce';

import Screen from './Screen';
import Separator from '../components/Separator';
import Carousel from 'react-native-snap-carousel';
import AuthContext from '../ultility/context';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3/4);

function DetailScreen({navigation, route}) {
    const {user, accessToken} = useContext(AuthContext);
    const auth = useContext(AuthContext);
    const post = route.params.item;
    const images = post.images;
    const steps = post.steps;
    const resources = post.resources;
    const [currentIndex, setCurrenIndex] = useState(1);
    const [save, setSave] = useState(false);
    const [randomRecipe, setRandomRecipe] = useState([]);
    const [recommendRecipe, setRecommendRecipe] = useState([]);
    const ratingAPI = create({baseURL: "http://192.168.1.236:8080/api/"});
    const recommendAPI = create({baseURL: "http://192.168.1.236:8000/api/"});

    useEffect(() => {
        checkFavoriteList();
        getSimilarRecipe();
        getRecommendRecipe();
        feedBack();
    }, [])

    useEffect(() => {
        const interval = setInterval( async () => {
            try {
                if(user) {
                    const data = {
                        username: user.username,
                        postID: post.id,
                        point: 1
                    }
                    const rs = await ratingAPI.post("rating?username=" + user.username + "&postID=" + post.id, data);
                    if(!rs.ok) {
                        console.log(rs.problem);
                    }
                    console.log("Feedback success!");
                }
            } catch (error) {
                console.log(error.message);
            }
        }, 60000);
        return () => clearInterval(interval);
    })

    const feedBack = async () => {
        try {
            if(user) {
                const data = {
                    username: user.username,
                    postID: post.id,
                    point: 1
                }
                const rs = await ratingAPI.post("rating?username=" + user.username + "&postID=" + post.id, data);
                if(!rs.ok) {
                    console.log(rs.problem);
                }
                console.log("Feedback success!");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const getRecommendRecipe = async () => {
        try {
            const rs = await recommendAPI.get("" + post.id);
            if(!rs.ok) {
                console.log(rs.problem);
            }
            const data = rs.data;
            const rsRecipe = [];
            for(let i = 0; i<data.length; i++) {
                const result = await foodAPI.getFoodByID(data[i]);
                if(!result.ok) {
                    console.log(result.problem);
                }
                else if(result.ok){
                    rsRecipe.push(result.data);
                }
                else {
                    continue;
                }
            }
            setRecommendRecipe(rsRecipe);
        } catch (error) {
            console.error(error.message);
        }
    }

    const checkFavoriteList = () => {
        if(user) {
            const favorList = user.post;
            if(favorList){
                let checkSave = favorList.some((item) => {
                    return item.id == post.id;
                });
                if(checkSave) {
                    return setSave(true);
                }
                return setSave(false);
            }
        }
    }

    const handleSaveFavorite = async () => {
        if(user) {
            if(save) {
                const newUser = user.post.filter((item) => item.id != post.id);
                const result = await userAPI.removeFavorite(user.username, post.id, accessToken);
                if(!result.ok) {
                    return console.error("Fail");
                }
                auth.setUser(newUser);
                setSave(false);
                Toast.showWithGravity("Remove recipe successfully!", Toast.LONG, Toast.BOTTOM);
            }
            else if (!save) {
                const newUser = user;
                const temp = [...user.post];
                newUser.post = [...temp, post];
                const result = await userAPI.addFavorite(user.username, post.id, accessToken);
                if(!result.ok) {
                    return console.error("Fail");
                }
                auth.setUser(newUser);
                setSave(true);
                Toast.showWithGravity("Add recipe to favorite list successfully!", Toast.LONG, Toast.BOTTOM);
            }
        }
        else {
            return Toast.showWithGravity("You need to Sign In to use this feature!", Toast.LONG, Toast.BOTTOM);
        }
    }

    const getSimilarRecipe = async () => {
        try {
            const result = await foodAPI.getFoodRandom(post.categoryID);
            if(!result.ok) {
                console.error(result.problem);
                Toast.showWithGravity("Having some errors when getting similar recipe!", Toast.LONG, Toast.BOTTOM);
            }
            
            setRandomRecipe(result.data);
        } catch (error) {
            console.log(error.message);
            Toast.showWithGravity("Having some errors when getting similar recipe!", Toast.LONG, Toast.BOTTOM);
        }
    }

    const handleItemPress = (item) => {
        navigation.replace('DetailFood', {item: item});
    }

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
                    <ListingItem name='arrow-left' size={40} backgroundColor={colors.box_item} contentColor={colors.secondary} style={styles.backButton} 
                                    onPress={onBackPress}
                    />
                    <Icon name='bookmark' size={40} style={styles.favorite} color={save ?colors.primary : colors.text_primary} onPress={handleSaveFavorite}/>
                    <View style={styles.imageIndex}>
                        <AppText style={styles.index}>{currentIndex}/{images?.length}</AppText>
                    </View>
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
                                    <AppText style={styles.content} key={item.id}>- {item.description}</AppText>
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

                    {/* Suggest by same category */}
                    <Separator style={styles.separator}/>
                    <View style={styles.box_item}>
                        <View style={styles.sub_title_container}>
                            <Icon2 name='food' color={colors.text_black} size={40} style={styles.icon}/>
                            <AppText style={styles.sub_title}>Similar Recipes</AppText>
                        </View>
                        <View style={styles.itemsContainer}>
                        {randomRecipe?.map((item, index) => {
                            return (
                                <VerPost
                                    image={item?.images[0]?.imgUrl}
                                    title={item?.post_name}
                                    userImg={item?.username?.image_url}
                                    username={item?.username?.username}
                                    onItemPress={() => handleItemPress(item)}
                                    key={item.id}
                                />
                            );
                        })}
                        </View>
                    </View>

                    {/* Suggest by same category */}
                    <Separator style={styles.separator}/>
                    <View style={styles.box_item}>
                        <View style={styles.sub_title_container}>
                            <Icon2 name='food-fork-drink' color={colors.text_black} size={40} style={styles.icon}/>
                            <AppText style={styles.sub_title}>Recommend for you</AppText>
                        </View>
                        <View style={styles.itemsContainer}>
                        {recommendRecipe?.map((item, index) => {
                            return (
                                <VerPost
                                    image={item?.images[0]?.imgUrl}
                                    title={item?.post_name}
                                    userImg={item?.username?.image_url}
                                    username={item?.username?.username}
                                    onItemPress={() => handleItemPress(item)}
                                    key={item.id}
                                />
                            );
                        })}
                        </View>
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
    sub_title_container: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    icon: {
        marginRight: 10
    },
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
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
})

export default DetailScreen;