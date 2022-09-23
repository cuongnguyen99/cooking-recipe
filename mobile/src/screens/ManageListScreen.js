import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import AppText from '../components/AppText';
import HorPost from '../components/HorPost';
import Screen from './Screen';
import AuthContext from '../ultility/context';
import AppLoading from './AppLoading';

import foodApi from '../ultility/api/food';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

function ManageListScreen() {
    const user = useSelector(state => state.user_slice.user);
    const accessToken = useSelector(state => state.auth_slice.token);
    const navigation = useNavigation();
    const route = useRoute();
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPosts();
    }, [route]);

    console.log(post);
    const getPosts = async () => {
        setLoading(true);
        const result = await foodApi.getPostNotAccept(accessToken);
        if(!result.ok) {
            setLoading(false);
            return console.log("Error when getting your recipe!");
        }
        const data = result.data;
        setPost(data);
        setLoading(false);
        return;
    }

    const handleClickOnFood = (item) => {
        navigation.navigate("ManageRecipe", {item: item});
    }

    return (
        <>
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false}>
            {
                post.map((item, index) => {
                    if(index == (post.length - 1)) {
                        return (
                            <View style={styles.item_bottom} key={item.id}>
                                <HorPost
                                    title={item.post_name}
                                    mainImg={item.images[0].imgUrl}
                                    description={item.description}
                                    userImg={item.username.image_url}
                                    username={item.username.username}
                                    onPress={() => handleClickOnFood(item)}
                                />
                            </View>
                        );
                    }
                    return (
                        <View style={styles.item} key={item.id}>
                            <HorPost
                                title={item.post_name}
                                mainImg={item.images[0].imgUrl}
                                description={item.description}
                                userImg={item.username.image_url}
                                username={item.username.username}
                                onPress={() => handleClickOnFood(item)}
                            />
                        </View>
                    );
                })
            }
            </ScrollView>
        </Screen>
        {loading ? <AppLoading/> : null}
        </>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 30,
        marginTop: 20
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30
    },
    subHeader: {
        marginTop: 5,
    },
    item: {
        marginTop: 10
    },
    item_bottom: {
        marginTop: 10,
        marginBottom: 10
    },
})

export default ManageListScreen;