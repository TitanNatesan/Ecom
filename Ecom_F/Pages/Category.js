import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, TextInput, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { faMagnifyingGlass, faUsersViewfinder, faShirt, faChildDress, faChild, faBlenderPhone, faShoePrints, faCar, faBiking, faPepperHot } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import BottomBar from './BottomBar';
const backl = require("../Streetmall/1Home/lg.png");



const giftbox = require('../Streetmall/1Home/gift.gif');
const laptop = require('../Streetmall/1Home/Laptop.png');
const mobile = require('../Streetmall/1Home/Mobiles.png');
const car = require('../Streetmall/1Home/car.png');
const watch = require('../Streetmall/1Home/Watch.png');

library.add(faMagnifyingGlass, faUsersViewfinder);

const data = [
    { icon: faShirt, text: "Men's Wear" },
    { icon: faChildDress, text: "Women's Wear" },
    { icon: faChild, text: "Kids Wear" },
    { icon: faBlenderPhone, text: "Home Appliances" },
    { icon: faShoePrints, text: "Shoes" },
    { icon: faCar, text: "Cars" },
    { icon: faBiking, text: "Bike" },
    { icon: faPepperHot, text: "Groceries" },
];

const Category = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const carouselItems = [
        { image: giftbox, text: 'Gifts' },
        { image: mobile, text: 'Mobiles' },
        { image: watch, text: 'Watches' },
        { image: laptop, text: 'Laptops' },
        { image: car, text: 'Car' },
    ];

    return (
        <View style={styles.containerw}>
            <ScrollView style={styles.all} vertical showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.topbarinput}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
                        <TextInput placeholder="Search Sunlight.in" style={styles.inputBox} />
                        {/* <FontAwesomeIcon icon={faUsersViewfinder} size={20} color="black" /> */}
                    </View>
                    <StatusBar barStyle="dark-content" />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.productsbar}>
                        {carouselItems.map((item, index) => (
                            item.text === "Gifts" ? (
                                <View key={index} style={[styles.productcont, { color: "#fff", backgroundColor: "#FF7272" }]}>
                                    <TouchableOpacity onPress={() => navigation.navigate("Gifts", { item })}>
                                        <Image style={styles.productImagegt} source={item.image} />
                                        <Text style={styles.protxtgt}>{item.text}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={() => navigation.navigate("AProduct", { item })}>
                                    <View key={index} style={styles.product}>
                                        <Image style={styles.productImage} source={item.image} />
                                        <Text>{item.text}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        ))}
                    </View>
                </ScrollView>

                <Text style={styles.category}>Shop by Category</Text>
                <View style={styles.categoryContainer}>
                    {data.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.categoryItem}
                            onPress={() => { navigation.navigate('AProduct', { item }) }}
                        >
                            <FontAwesomeIcon icon={item.icon} size={20} color="black" />
                            <Text style={styles.categoryLabel}>{item.text}</Text>
                            <FontAwesomeIcon icon={faChevronRight} size={20} color="black" />
                        </TouchableOpacity>
                    ))}
                </View>
                <Text> {'\n'} </Text><Text> {'\n'} </Text><Text> {'\n'} </Text>
            </ScrollView>
            {/* Bottom Bar */}
            <BottomBar navigation={navigation} initialPage="Category" />

            {/* Blue Bar */}
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
        backgroundColor: '#FFAC2F',
        padding: 5,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        maxWidth: 150,
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
        backgroundColor: '#1977F33A',
        color: "#fff",
    },
    product: {
        marginRight: 25,
        alignItems: 'center',
    },
    productcont: {
        marginRight: 25,
        alignItems: 'center',
        paddingRight: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    backgroundImage: {
        width: '115%',
        height: 90,
        alignItems: 'center',
    },
    productImagegt: {
        width: 65,
        height: 60,
        borderRadius: 10,
        left: '10%',
        objectFit: "contain",
    },
    protxtgt: {
        alignSelf: 'center',
        margin: 'auto',
        color: "#000",
        

    },
    productImage: {
        width: 65,
        height: 70,
        borderRadius: 10,
        objectFit: "contain",
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

export default Category;
