import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { faMagnifyingGlass, faCircleUser, faUsersViewfinder, faShirt, faChildDress, faChild, faBlenderPhone, faShoePrints, faCar, faBiking, faPepperHot } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import BottomBar from './BottomBar';

const giftbox = require('../Streetmall/1Home/gift.gif');
const laptop = require('../Streetmall/1Home/Laptop.png');
const mobile = require('../Streetmall/1Home/Mobiles.png');
const car = require('../Streetmall/1Home/car.png');
const watch = require('../Streetmall/1Home/Watch.png');

library.add(faMagnifyingGlass, faUsersViewfinder);

const data = [
    { icon: faCircleUser, label: "Name" },
    { icon: faCircleUser, label: "Name" },
    { icon: faCircleUser, label: "Name" },
    { icon: faCircleUser, label: "Name" },
    { icon: faCircleUser, label: "Name" },
    { icon: faCircleUser, label: "Name" },
    { icon: faCircleUser, label: "Name" },
    { icon: faCircleUser, label: "Name" },
];

//Dei natesan maakan - mela irukura json data la ni names display panna vachuko..ilana modify according to ur convinience , 



const Manager1 = ({ navigation }) => {
    const handleMenswearPress = () => {
        navigation.navigate('Manager2');
    };

    return (
        <View style={styles.containerw}>
            <ScrollView style={styles.all} vertical showsVerticalScrollIndicator={false}>
                <View style={styles.container} >
                    <FontAwesomeIcon icon={faCircleUser} style={{ color: '#fff', marginLeft:'5%', }}size={30} />
                    <Text style={{marginLeft:'3%',color:'#fff',}}>General Manager Name</Text>
                </View>
                <View>
  <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 20 }}>
    <Text style={{ padding: 10 }}>Referred</Text>
    <Text style={{ backgroundColor: '#FFAC2F',color:'#fff', width: 150, textAlign: 'center', paddingVertical: 10, borderRadius: 10 }}>00</Text>
  </View>

  <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 20 }}>
    <Text style={{ padding: 10 }}>Income</Text>
    <Text style={{ backgroundColor: '#FFAC2F',color:'#fff', width: 150, textAlign: 'center', paddingVertical: 10, borderRadius: 10 }}>00/-</Text>
  </View>
</View>

                <Text style={styles.category}>Regional Managers</Text>
                <View style={styles.categoryContainer}>
                    {data.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.categoryItem}
                        >
                            <FontAwesomeIcon icon={item.icon} size={20} color="black" />
                            <Text style={styles.categoryLabel}>{item.label}</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={20} color="black" />
                        </TouchableOpacity>
                    ))}
                </View>
                <Text> {'\n'} </Text><Text> {'\n'} </Text><Text> {'\n'} </Text>
            </ScrollView>
            <BottomBar navigation={navigation} initialPage="Category" />
            <View style={styles.blueBar}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerw: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingTop: 120,
        backgroundColor: '#1977F3',
        paddingBottom: 15,
    },
    blueBar: {
        backgroundColor: '#1977F3',
        height: 15,
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
    },
    all: {
        backgroundColor: '#D3E6FD',
    },
    category: {
        padding: 5,
        color:'#871818',
        fontSize:20,
    },
    topbarinput: {
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    inputBox: {
        flex: 1,
        color: '#1977F3',
        marginLeft: 10,
    },
    productsbar: {
        flexDirection: 'row',
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: 'rgba(25, 119, 243, 0.4)',
    },
    product: {
        marginRight: 25,
        alignItems: 'center',
    },
    productImage: {
        width: 65,
        height: 70,
        borderRadius: 10,
    },
    categoryContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        width: '98%',
    },
    categoryLabel: {
        marginLeft: 10,
        flex: 1,
    },
});

export default Manager1;
