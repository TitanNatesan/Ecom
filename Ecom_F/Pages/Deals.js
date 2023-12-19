import React from 'react'
import { StyleSheet, View, Image, Text, TextInput, StatusBar, ScrollView } from "react-native";
import { faMagnifyingGlass, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomBar from './BottomBar'; 


const giftbox = require("../Streetmall/1Home/gift.gif");
const laptop = require("../Streetmall/1Home/Laptop.png");
const mobile = require("../Streetmall/1Home/Mobiles.png");
const car = require("../Streetmall/1Home/car.png");
const watch = require("../Streetmall/1Home/Watch.png");

const Offer = require("../assets/offer.png");
const dress = require("../assets/dress.jpg");
const shoe = require("../assets/shoe799.jpg");

library.add(faMagnifyingGlass, faUsersViewfinder);

const Deals = ({navigation}) => {

    const carouselItems = [
        { image: giftbox, text: "Gifts" },
        { image: mobile, text: "Mobiles" },
        { image: watch, text: "Watches" },
        { image: laptop, text: "Laptops" },
        { image: car, text: "Car" },
    ];
    return (
        <View style={styles.containerw}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.topbarinput}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
                        <TextInput placeholder="Search Sunlight.in" style={styles.inputBox} />
                        <FontAwesomeIcon icon={faUsersViewfinder} size={20} color="black" />
                    </View>
                    <StatusBar style="dark-content" />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.productsbar}>
                        {carouselItems.map((item, index) => (
                            <View key={index} style={styles.product}>
                                <Image style={styles.productImage} source={item.image} />
                                <Text>{item.text}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <View style={styles.deals}>
                    <Image style={styles.pic} source={dress} />
                    <Image style={styles.pic} source={Offer} />
                    <Image style={styles.pic} source={shoe} />
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
            <View style={styles.blueBar}></View>
        </View>
    
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 120,
        backgroundColor: "#1977F3",
        paddingBottom: 15,
    },
    containerw: {
        flex:1,
        backgroundColor: "#ffffff",
    },
    blueBar: {
        backgroundColor: '#1977F3',
        height: 15,
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
      },
    deals: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    pic: {
        margin: 5, 
        width: '90%', 
        height: 150, 
        borderRadius: 16,
        resizeMode: 'contain', 
    },
    topbarinput: {
        justifyContent: "center",
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
    },
    inputBox: {
        flex: 1,
        color: "#1977F3",
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
})
export default Deals