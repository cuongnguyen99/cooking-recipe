import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AppInput from '../components/AppInput';
import ListingItem from '../components/ListingItem';
import colors from '../styles/colors';
import Screen from './Screen';
import HorPost from '../components/HorPost';

import Icon from 'react-native-vector-icons/Feather';

import foodAPI from '../ultility/api/food';

function SearchScreen({navigation, route}) {
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState([]);

    const searchFood = async () => {
        const result = await foodAPI.getFoodByName(input);
        if(!result.ok) {
            console.error("Searching error!");
            return;
        }
        const data = result.data;
        console.log(data);
        setFilter(data);
    }

    const handleClickOnFood = (item) => {
        navigation.navigate('Detail', {item: item});
    }

    return (
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
                    <AppInput
                        style= {styles.input}
                        title= 'Nhập tên món ăn cần tìm...'
                        placeholderTextColor= {colors.text_secondary}
                        value= {input}
                        onChangeText= {(text) => setInput(text)}
                    />
                    <ListingItem name='search' size={50} contentColor={colors.primary}  backgroundColor={colors.box_item} onPress={searchFood}/>
                </View>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    {
                        filter.map(item => {
                            return (
                                <View style={styles.item} key={item.id}>
                                    <HorPost
                                        title={item.post_name}
                                        mainImg={item.images[0].img_url}
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
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 90,
        elevation: 1
    },
    inputContainer: {
        top: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        elevation: 2
    },
    input: {
        backgroundColor: colors.box_item,
        width: '80%',
        borderRadius: 30,
        paddingLeft: 20,
        height: 50,
        fontSize: 16,
        color: colors.text_black
    },
    inputButton: {
        backgroundColor: colors.secondary,
        width: 50,
        borderRadius: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        marginBottom: 20
    }
})

export default SearchScreen;