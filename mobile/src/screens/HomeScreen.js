import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';

import AppText from '../components/AppText';
import Category from '../components/Category';
import HeaderNavigate from '../components/HeaderNavigate';
import NewFood from '../components/NewFood';
import Screen from './Screen';

const data = [
    {
        id: 1,
        title: 'Bánh tráng trộn đà nẵng',
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

const categories = [
    {
        id: 1,
        title: 'Main course',
        imgUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/11/25/0/FNK_pan-seared-salmon-with-kale-apple-salad_s4x3.jpg.rend.hgtvcom.616.462.suffix/1387918756116.jpeg',
    },
    {
        id: 2,
        title: 'Side dish',
        imgUrl: 'https://assets.epicurious.com/photos/5ad78633b24afe5122e72b5b/master/pass/blistered-asparagus-recipe-BA-041818.jpg',
    },
    {
        id: 3,
        title: 'Savory Food',
        imgUrl: 'https://static.onecms.io/wp-content/uploads/sites/9/2013/09/apple-ham-quiche-FT-RECIPE0919.jpg',
    },
    {
        id: 4,
        title: 'Dessert',
        imgUrl: 'https://img.taste.com.au/xi2t8DpL/taste/2016/11/lemon-panna-cotta-with-vodka-blueberry-syrup-92005-1.jpeg',
    },
]

function HomeScreen({navigation, route}) {
    const newArivalPress = () => {
        console.log('New Food!');
    }

    const handleCategoryPress = () => {
        navigation.navigate('FoodList');
    }

    return (
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Container */}
                <View style={styles.headerContainer}>
                    <AppText style={styles.header}>Hello guys!</AppText>
                    <AppText style={styles.subHeader}>Let's discovery some recipes around here...</AppText>
                </View>
                <HeaderNavigate
                    title='Newest Food'
                    style={styles.newFoodHeader}
                    onPress={handleCategoryPress}
                />

                {/* New Food */}
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <>
                            <NewFood
                                title={item.title}
                                avatar={item.userURL}
                                image={item.foodURL}
                            />
                            <View style={styles.categoryFooter}></View>
                        </>
                    )}
                />

                {/* List Categories */}
                {categories.map(item => (
                    <View key={item.id}>
                        <HeaderNavigate
                                    title={item.title}
                                    style={styles.categoryHeader}
                                    onPress={handleCategoryPress}
                        />
                        <Category
                            title={item.title}
                            image={item.imgUrl}
                            onPress={handleCategoryPress}
                        />
                        <View style={styles.categoryFooter} />
                    </View>
                ))}
            </ScrollView>   
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
        marginBottom: 30,
        marginTop: 20
    },
    newFoodHeader: {
        marginBottom: 10
    },
    categoryHeader: {
        marginBottom: 10,
        marginTop: 20
    },
    categoryFooter: {
        marginBottom: 10
    }

})

export default HomeScreen;