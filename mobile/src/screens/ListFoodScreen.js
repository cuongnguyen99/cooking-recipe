import React, { useLayoutEffect } from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import VerPost from '../components/VerPost';
import colors from '../styles/colors';
import Screen from './Screen';

const data = [
    {
        id: 1,
        title: 'Cá nướng mỡ xoài mắc mật',
        description: 'Món cá chim nướng muối ớt, tiêu xanh và ớt xiêm với 3 cách làm trên vừa thơm ngon vừa cay cay lạ miệng lại cực kì dễ thực hiện. Hãy nhanh chân chạy ngay vào bếp và thực hiện ngay thôi nào.',
        userImg: 'https://vcdn-vnexpress.vnecdn.net/2019/11/14/IMG-9357-JPG-7490-1573703159.jpg',
        username: 'ngobakha_vippro123',
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
]

function ListFoodScreen({navigation, route}) {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: colors.primary
            },
            headerBackVisible: true,
            headerTitle: ''
        });
    }, [navigation]);

    const handleItemPress = () => {
        navigation.navigate('DetailFood');
    }

    return (
        <Screen style={styles.screen}>
            <StatusBar backgroundColor={colors.primary} barStyle='dark-content'/>

            <FlatList
                numColumns={2}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <VerPost
                        image={item.mainImg}
                        title={item.title}
                        userImg={item.userImg}
                        username={item.username}
                        onItemPress={handleItemPress}
                    />
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingLeft: 5,
        paddingRight: 5,
        position: 'relative',
    },
    header: {
        position: 'absolute',
        width: '100%',
        height: 40,
        backgroundColor: colors.primary,
        zIndex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    }
})

export default ListFoodScreen;