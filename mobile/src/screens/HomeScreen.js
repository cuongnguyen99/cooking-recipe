import React, {useState, useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';

import AppText from '../components/AppText';
import Category from '../components/Category';
import HeaderNavigate from '../components/HeaderNavigate';
import NewFood from '../components/NewFood';
import Screen from './Screen';

import category from '../ultility/api/category';

function HomeScreen({navigation, route}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        handleGetCategory();
    }, []);

    const handleGetCategory = async () => {
        const result = await category.getCategory();

        if(!result.ok) {
            console.log("Error when reder category!");
            return;
        }

        const data = result.data;
        setCategories(data);
    }

    const newArivalPress = () => {
        console.log('New Food!');
    }

    const handleCategoryPress = (categoryID) => {
        navigation.navigate('FoodList', {categoryID: categoryID});
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
                {/* <FlatList
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
                /> */}

                {/* List Categories */}
                {categories.map(item => (
                    <View key={item.id}>
                        <HeaderNavigate
                                    title={item.category_name}
                                    style={styles.categoryHeader}
                                    onPress={() => handleCategoryPress(item.id)}
                        />
                        <Category
                            title={item.category_name}
                            image={item.img_url}
                            onPress={() => handleCategoryPress(item.id)}
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