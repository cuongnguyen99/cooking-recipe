import React, {useContext, useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import AppText from '../components/AppText';
import HorPost from '../components/HorPost';
import AuthContext from '../ultility/context';
import Screen from './Screen';

function SaveScreen({navigation, route}) {
    const {user, accessToken} = useContext(AuthContext);
    const [post, setPost] = useState([]);

    useEffect(() => {
        const unsubcribe = navigation.addListener('focus', () => {
            console.log(user);
            setPost(user.post);
        });
        return unsubcribe;
    }, [navigation])

    const handleClickOnFood = (item) => {
        navigation.navigate('Detail', {item: item});
    }

    return (
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    !post.length ? 
                    (<View style={styles.headerEmpty}>
                        <AppText style={styles.subHeaderEmpty}>Your favorite recipe is empty!</AppText>
                    </View>) 
                    :
                    (<View style={styles.headerContainer}>
                        <AppText style={styles.subHeader}>Here is your favorite recipes!</AppText>
                    </View>)
                }
                
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
        fontSize: 26,
        fontWeight: '300'
    },
    item: {
        marginBottom: 20
    },
    headerEmpty: {
       alignSelf: 'center',
       marginTop: '100%'
    },
    subHeaderEmpty: {
        fontSize: 22,
        fontWeight: '300'
    }
})

export default SaveScreen;