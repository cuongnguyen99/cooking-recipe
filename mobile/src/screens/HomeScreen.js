import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';

import AppText from '../components/AppText';
import HeaderNavigate from '../components/HeaderNavigate';
import NewFood from '../components/NewFood';
import Screen from './Screen';

const data = [
    {
        id: 1,
        title: 'Bánh tráng trộn',
        userURL: 'https://i.ex-cdn.com/phatgiao.org.vn/files/content/2019/04/02/banh1024x626_1-1750.jpg',
        foodURL: 'https://meta.vn/Data/image/2020/11/20/banh-trang-tron-5.jpg'
    },
    {
        id: 2,
        title: 'Bánh tráng trộn',
        userURL: 'https://i.ex-cdn.com/phatgiao.org.vn/files/content/2019/04/02/banh1024x626_1-1750.jpg',
        foodURL: 'https://meta.vn/Data/image/2020/11/20/banh-trang-tron-5.jpg'
    },
    {
        id: 3,
        title: 'Bánh tráng trộn',
        userURL: 'https://i.ex-cdn.com/phatgiao.org.vn/files/content/2019/04/02/banh1024x626_1-1750.jpg',
        foodURL: 'https://meta.vn/Data/image/2020/11/20/banh-trang-tron-5.jpg'
    },
    {
        id: 4,
        title: 'Bánh tráng trộn',
        userURL: 'https://i.ex-cdn.com/phatgiao.org.vn/files/content/2019/04/02/banh1024x626_1-1750.jpg',
        foodURL: 'https://meta.vn/Data/image/2020/11/20/banh-trang-tron-5.jpg'
    },
    {
        id: 5,
        title: 'Bánh tráng trộn',
        userURL: 'https://i.ex-cdn.com/phatgiao.org.vn/files/content/2019/04/02/banh1024x626_1-1750.jpg',
        foodURL: 'https://meta.vn/Data/image/2020/11/20/banh-trang-tron-5.jpg'
    },
    {
        id: 6,
        title: 'Bánh tráng trộn',
        userURL: 'https://i.ex-cdn.com/phatgiao.org.vn/files/content/2019/04/02/banh1024x626_1-1750.jpg',
        foodURL: 'https://meta.vn/Data/image/2020/11/20/banh-trang-tron-5.jpg'
    },
]

function HomeScreen(props) {
    const newArivalPress = () => {
        console.log('New Food!');
    }

    return (
        <Screen>
            {/* Header Container */}
            <View style={styles.headerContainer}>
                <AppText style={styles.header}>Hello guys!</AppText>
                <AppText style={styles.subHeader}>Let's discovery some recipes around here...</AppText>
            </View>
            <HeaderNavigate
                title='Món mới nhất'
                style={styles.newFoodHeader}
            />
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                horizontal
                renderItem={({item}) => (
                    <NewFood
                        title={item.title}
                        avatar={item.userURL}
                        image={item.foodURL}
                    />
                )}
            />
            
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 30
    },
    subHeader: {
        marginTop: 5,
    },
    headerContainer: {
        marginBottom: 30
    },
    newFoodHeader: {
        marginBottom: 3
    },
    newFoodContain: {

    }

})

export default HomeScreen;