import React, {useContext, useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import AppText from '../components/AppText';
import HorPost from '../components/HorPost';
import Screen from './Screen';
import AuthContext from '../ultility/context';
import AppLoading from './AppLoading';

import userApi from '../ultility/api/user';

function YourRecipeScreen({navigation, route}) {
    const {user, accessToken} = useContext(AuthContext);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPostCreated();
    }, []);

    const getPostCreated = async () => {
        setLoading(true);
        const result = await userApi.postCreated(user.username, accessToken);
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
        if(item.accepted) {
            navigation.replace("DetailRecipe", {item: item});
        }
        else {
            navigation.replace("UpdateRecipe", {item: item});
        }
    }

    return (
        <>
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false}>
            {
                post.map(item => {
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
        marginBottom: 10,
        marginTop: 10
    }
})

export default YourRecipeScreen;