import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AppInput from '../components/AppInput';
import ListingItem from '../components/ListingItem';
import colors from '../styles/colors';
import Screen from './Screen';
import HorPost from '../components/HorPost';

import Icon from 'react-native-vector-icons/Feather';
import {useValidation} from 'react-native-form-validator';

import foodAPI from '../ultility/api/food';
import Toast from 'react-native-simple-toast';
import AppLoading from './AppLoading';

function SearchScreen({navigation, route}) {
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);

    const {validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({state : {input}});

    const searchFood = async () => {
        try {
            const valid = validate({
                input: {required: true},
            });
            
            if(valid) {
                setLoading(true);
                const result = await foodAPI.getFoodByName(input);
                if(!result.ok) {
                    console.error("Searching error!");
                    setLoading(false);
                    return Toast.showWithGravity("Error when getting Recipe!", Toast.LONG, Toast.TOP);
                }
                const data = result.data;
                setTimeout(() => {
                    setFilter(data);
                    return setLoading(false);
                }, 2000);
            }
            else{
                return Toast.showWithGravity("Please enter your Recipe's name you are looking for...!", Toast.LONG, Toast.TOP);
            }
        } catch (error) {
            Toast.showWithGravity("Error when getting Recipe!", Toast.LONG, Toast.TOP);
            console.log(error.message);
        }
        
    }

    const handleClickOnFood = (item) => {
        navigation.navigate('Detail', {item: item});
    }

    return (
        <>
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
            </ScrollView>
        </Screen>
        {loading ? <AppLoading/> : null}
        </>
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