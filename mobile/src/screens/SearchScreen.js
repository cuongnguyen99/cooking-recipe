import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AppInput from '../components/AppInput';
import ListingItem from '../components/ListingItem';
import colors from '../styles/colors';
import Screen from './Screen';
import HorPost from '../components/HorPost';

import Icon from 'react-native-vector-icons/Feather';

const data = [
    {
        id: 1,
        title: 'Cá nướng',
        description: 'Món cá chim nướng muối ớt, tiêu xanh và ớt xiêm với 3 cách làm trên vừa thơm ngon vừa cay cay lạ miệng lại cực kì dễ thực hiện. Hãy nhanh chân chạy ngay vào bếp và thực hiện ngay thôi nào.',
        userImg: 'https://vcdn-vnexpress.vnecdn.net/2019/11/14/IMG-9357-JPG-7490-1573703159.jpg',
        username: 'loveyou123',
        mainImg: 'https://cdn.tgdd.vn/2020/08/CookProduct/1-1200x676-21.jpg'
    },
    {
        id: 2,
        title: 'Bánh tráng trộn',
        description: 'Món cá chim nướng muối ớt, tiêu xanh và ớt xiêm với 3 cách làm trên vừa thơm ngon vừa cay cay lạ miệng lại cực kì dễ thực hiện. Hãy nhanh chân chạy ngay vào bếp và thực hiện ngay thôi nào.',
        userImg: 'https://vcdn-vnexpress.vnecdn.net/2019/11/14/IMG-9357-JPG-7490-1573703159.jpg',
        username: 'loveyou123',
        mainImg: 'https://www.winefoodbeer.com/wp-content/uploads/2021/08/cach-lam-banh-trang-tron.jpg'
    },
    {
        id: 3,
        title: 'Bò bít tết',
        description: 'Món cá chim nướng muối ớt, tiêu xanh và ớt xiêm với 3 cách làm trên vừa thơm ngon vừa cay cay lạ miệng lại cực kì dễ thực hiện. Hãy nhanh chân chạy ngay vào bếp và thực hiện ngay thôi nào.',
        userImg: 'https://vcdn-vnexpress.vnecdn.net/2019/11/14/IMG-9357-JPG-7490-1573703159.jpg',
        username: 'loveyou123',
        mainImg: 'https://cdn.daotaobeptruong.vn/wp-content/uploads/2021/04/bo-bit-tet.jpg'
    },
    {
        id: 4,
        title: 'Heo quay',
        description: 'Món cá chim nướng muối ớt, tiêu xanh và ớt xiêm với 3 cách làm trên vừa thơm ngon vừa cay cay lạ miệng lại cực kì dễ thực hiện. Hãy nhanh chân chạy ngay vào bếp và thực hiện ngay thôi nào.',
        userImg: 'https://vcdn-vnexpress.vnecdn.net/2019/11/14/IMG-9357-JPG-7490-1573703159.jpg',
        username: 'loveyou123',
        mainImg: 'https://mayranghat.vn/wp-content/uploads/2018/11/48bf36ff0c275d80c07f0eff235b7d45.jpg'
    },
    {
        id: 5,
        title: 'Gỏi sứa trộn',
        description: 'Món cá chim nướng muối ớt, tiêu xanh và ớt xiêm với 3 cách làm trên vừa thơm ngon vừa cay cay lạ miệng lại cực kì dễ thực hiện. Hãy nhanh chân chạy ngay vào bếp và thực hiện ngay thôi nào.',
        userImg: 'https://vcdn-vnexpress.vnecdn.net/2019/11/14/IMG-9357-JPG-7490-1573703159.jpg',
        username: 'loveyou123',
        mainImg: 'https://thucthan.com/media/2019/07/nom-sua/nom-sua.jpg'
    },
    {
        id: 6,
        title: 'Bánh mỳ trứng',
        description: 'Món cá chim nướng muối ớt, tiêu xanh và ớt xiêm với 3 cách làm trên vừa thơm ngon vừa cay cay lạ miệng lại cực kì dễ thực hiện. Hãy nhanh chân chạy ngay vào bếp và thực hiện ngay thôi nào.',
        userImg: 'https://vcdn-vnexpress.vnecdn.net/2019/11/14/IMG-9357-JPG-7490-1573703159.jpg',
        username: 'loveyou123',
        mainImg: 'https://ghemassageelip.com/wp-content/uploads/2021/06/banh-mi-trung-bao-nhieu-calo-an-banh-mi-trung-co-beo-khong.jpg'
    },
    {
        id: 7,
        title: 'Đậu hũ Tứ Xuyên',
        description: 'Món cá chim nướng muối ớt, tiêu xanh và ớt xiêm với 3 cách làm trên vừa thơm ngon vừa cay cay lạ miệng lại cực kì dễ thực hiện. Hãy nhanh chân chạy ngay vào bếp và thực hiện ngay thôi nào.',
        userImg: 'https://vcdn-vnexpress.vnecdn.net/2019/11/14/IMG-9357-JPG-7490-1573703159.jpg',
        username: 'loveyou123',
        mainImg: 'https://i-vnexpress.vnecdn.net/2019/10/14/310477379-w500-1571026056-1770-1571026093_680x0.jpeg'
    },
];

function SearchScreen({navigation, route}) {
    const [input, setInput] = useState('');
    const [product, setProduct] = useState(data);
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