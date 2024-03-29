import React, {useState, useEffect, useMemo, useCallback, useLayoutEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, View, SectionList, RefreshControl, ActivityIndicator} from 'react-native';
import Toast from 'react-native-simple-toast';

import AppText from '../components/AppText';
import Category from '../components/Category';
import HeaderNavigate from '../components/HeaderNavigate';
import NewFood from '../components/NewFood';
import Screen from './Screen';

import category from '../ultility/api/category';
import foodAPI from '../ultility/api/food';
import AppLoading from './AppLoading';
import colors from '../styles/colors';

function HomeScreen({navigation, route}) {
    const [categories, setCategories] = useState([]);
    const [newest, setNewest] = useState([]);
    const [section, setSection] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setLoading(true);
        handleData();
    }, []);

    const onRefresh = () => {
        setCategories([]);
        setNewest([]);
        handleData();
    }

    const handleData = () => {
        Promise.all([handleGetCategory(), handleGetNewest()]).then(([categoryData, newestData]) => {
            let newRecipe = {
                title: "Newest Recipe",
                horizontal: true,
                data: [...newestData]
            };
            let newCategories = categoryData.map((item) => {
                return {
                    title: item.category_name,
                    data: [{
                        id: item.id,
                        name: item.category_name,
                        img_url: item.img_url
                    }]
                };
            });
            const newSection = [newRecipe,...newCategories];
            setSection(newSection);
            setLoading(false);
        }).catch(error => {
            console.log(error.message);
            Toast.showWithGravity("Having some error! Please try again!");
            setLoading(false);
        })
    }

    // const handleData = () => {
    //     handleGetCategory();
    // }

    const handleGetCategory = async () => {
        try {
            const result = await category.getCategory();
    
            if(!result.ok) {
                console.log("Error when get category!");
                return;
            }
    
            const data = result.data;
            setCategories(data);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetNewest = async () => {
        const result = await foodAPI.getNewFood();
        if(!result.ok) {
            console.log("Error when reder newest food!");
            return;
        }

        const data = result.data;
        setNewest(data);
        return data;
    }

    const newArivalPress = (item) => {
        navigation.navigate('DetailFood', {item: item});
    }

    const handleCategoryPress = (categoryID) => {
        navigation.navigate('FoodList', {categoryID: categoryID});
    }

    const renderNewest = useCallback(({item}) => (
        <>
            <NewFood
                title={item?.post_name}
                avatar={item?.username?.image_url}
                image={item?.images[0]?.imgUrl}
                onPress={() => newArivalPress(item)}
            />
            <View style={styles.categoryFooter}></View>
        </>
    ), []);

   const renderSection = useCallback(({ section }) => (<>
            {
                section.horizontal && (<>
                <View style={styles.headerContainer}>
                <AppText style={styles.header}>Hello guys!</AppText>
                <AppText style={styles.subHeader}>Let's discovery some recipes around here...</AppText>
                </View>
                {/* <HeaderNavigate
                    title="Newest Recipe"
                    style={styles.newFoodHeader}
                    disable={true}
                /> */}
                <FlatList
                    data={section?.data}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    maxToRenderPerBatch={10}
                    renderItem={renderNewest}
                />
                </>)
            }
        </>
    ),[section]) 
    
    return (
        <>
        <Screen>
            <SectionList
                sections={section}
                keyExtractor={(item, index) => item + index}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={renderSection}
                renderItem={({item ,section}) => {
                    if(section.horizontal) {
                        return null;
                    }
                    return(
                        <>
                        <HeaderNavigate
                            title={item?.name}
                            style={styles.categoryHeader}
                            onPress={() => handleCategoryPress(item.id)}
                        />
                        <Category
                            title={item?.category_name}
                            image={item?.img_url}
                            onPress={() => handleCategoryPress(item.id)}
                        />
                        <View style={styles.categoryFooter} />
                        </>
                    )
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                    />
                }
            />
        </Screen>
        {loading ? (<AppLoading/>) : null}
        </>
    );
    // return (
    //     <>
    //     <Screen>
    //         <FlatList
    //             data={categories}
    //             keyExtractor={item => item.id}
    //             showsVerticalScrollIndicator={false}
    //             renderItem={({item, index}) => {
    //                 if(index === 0) return (
    //                     <>
    //                     <View style={styles.categoryFooter}>
    //                         <View style={styles.headerContainer}>
    //                             <AppText style={styles.header}>Hello guys!</AppText>
    //                             <AppText style={styles.subHeader}>Let's discovery some recipes around here...</AppText>
    //                         </View>
    //                         <HeaderNavigate
    //                             title={item?.category_name}
    //                             style={styles.categoryHeader}
    //                             onPress={() => handleCategoryPress(item.id)}
    //                         />
    //                         <Category
    //                             image={item?.img_url}
    //                             title={item?.category_name}
    //                             onPress={() => handleCategoryPress(item.id)}
    //                         />
    //                     </View>
    //                     </>
    //                 )
    //                 return (
    //                     <View style={styles.categoryFooter}>
    //                         <HeaderNavigate
    //                             title={item?.category_name}
    //                             style={styles.categoryHeader}
    //                             onPress={() => handleCategoryPress(item.id)}
    //                         />
    //                         <Category
    //                             image={item?.img_url}
    //                             title={item?.category_name}
    //                             onPress={() => handleCategoryPress(item.id)}
    //                         />
    //                     </View>
    //                 )
    //             }
    //             }
    //             refreshControl={
    //                 <RefreshControl
    //                     refreshing={refresh}
    //                     onRefresh={onRefresh}
    //                     colors={[colors.primary]}
    //                 />
    //             }
    //         />
    //     </Screen>
    //     {loading ? (<AppLoading/>) : null}
    //     </>
    // );
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