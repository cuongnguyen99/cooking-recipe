import React, {useContext, useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import AppText from '../components/AppText';
import HorPost from '../components/HorPost';
import Screen from './Screen';
import AuthContext from '../ultility/context';
import AppLoading from './AppLoading';
import Icon from 'react-native-vector-icons/Feather';

import userApi from '../ultility/api/user';
import colors from '../styles/colors';

function ListRecipeNotAcceptedScreen({navigation, route}) {
    const {user, accessToken} = useContext(AuthContext);
    const [post, setPost] = useState([]);
    const [postAccepted, setPostAccepted] = useState([]);
    const [postWaiting, setPostWaiting] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubcribe = navigation.addListener('focus', () => {
            getPostCreated();
        });
        return unsubcribe;
    }, [navigation]);

    const getPostCreated = async () => {
        setLoading(true);
        const result = await userApi.postCreated(user.username, accessToken);
        if(!result.ok) {
            setLoading(false);
            return console.log("Error when getting your recipe!");
        }

        const data = result.data;
        const not_accepted = data.filter((item) => {
            return item.accepted == false;
        });
        setPostWaiting(not_accepted);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        return;
    }

    const handleClickOnFood = (item) => {
        if(item.accepted) {
            navigation.navigate("DetailRecipe", {item: item});
        }
        else {
            navigation.navigate("UpdateRecipe", {item: item});
        }
    }

    return (
        <>
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false}>
            {
                !postWaiting.length ? (<AppText style={styles.nofity}>All your recipes have been approved!</AppText>) :
                (postWaiting.map((item, index) => {
                    if(index == (postWaiting.length - 1)) {
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
                }))
            }
            </ScrollView>
        </Screen>
        {loading ? <AppLoading/> : null}
        </>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        backgroundColor: colors.primary,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.text_primary,
        marginLeft: 20
    },
    subHeader: {
        marginTop: 5,
    },
    item: {
        marginTop: 15,
    }, 
    item_bottom: {
        marginTop: 15,
        marginBottom: 10
    },
    nofity: {
        fontSize: 16,
        margin: 10,
        marginLeft: 12,
        marginTop: 15
    }
})

export default ListRecipeNotAcceptedScreen;