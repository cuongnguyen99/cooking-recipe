import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AppInput from '../components/AppInput';
import ListingItem from '../components/ListingItem';
import colors from '../styles/colors';
import Screen from './Screen';
import HorPost from '../components/HorPost';

import Icon from 'react-native-vector-icons/Feather';

function SearchScreen({navigation, route}) {
    const [input, setInput] = useState('');
    const [product, setProduct] = useState([]);
    const [filter, setFilter] = useState([]);



    useEffect(() => {
        if(input) {
            const list = product.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                
                const textData = input.toUpperCase();

                return itemData.indexOf(textData) > -1;
            });
            setFilter(list);
        }
        else {
            setFilter(product)
        }
    }, [input])

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
                    <ListingItem name='search' size={50} contentColor={colors.primary}  backgroundColor={colors.box_item}/>
                </View>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    {
                        filter.map(item => {
                            return (
                                <View style={styles.item} key={item.id}>
                                    <HorPost
                                        title={item.title}
                                        mainImg={item.mainImg}
                                        description={item.description}
                                        userImg={item.userImg}
                                        username={item.username}
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