import React, { useEffect, useLayoutEffect, useState } from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import VerPost from '../components/VerPost';
import colors from '../styles/colors';
import Screen from './Screen';

import foodAPI from '../ultility/api/food';

function ListFoodScreen({navigation, route}) {
    const categoryID = route.params.categoryID;
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        getListPosts();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerBackVisible: true,
            headerTitle: ''
        });
    }, [navigation]);

    const handleItemPress = (item) => {
        navigation.navigate('DetailFood', {item: item});
    }

    const getListPosts = async () => {
        const result = await foodAPI.getFoodByCategory(categoryID);

        if(!result.ok) {
            console.error("Have some error when getting Food by Category!");
            return;
        }

        const data = result.data;
        setPosts(data);
    }

    return (
        <Screen style={styles.screen}>
            <FlatList
                numColumns={2}
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <VerPost
                        image={item.images[0].imgUrl}
                        title={item.post_name}
                        userImg={item.username.image_url}
                        username={item.username.username}
                        onItemPress={() => handleItemPress(item)}
                    />
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingLeft: 5,
        paddingRight: 5,
        position: 'relative',
    },
    header: {
        position: 'absolute',
        width: '100%',
        height: 40,
        backgroundColor: colors.primary,
        zIndex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    }
})

export default ListFoodScreen;