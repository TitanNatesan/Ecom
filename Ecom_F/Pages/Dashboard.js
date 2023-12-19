import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import BottomBar from './BottomBar';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;
const Dashboard = ({ navigation }) => {
    const [chartData, setChartData] = useState({
        labels: ['Mon', 'tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [2, 4, 6, 2, 1, 8, 10],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    });



    const [productCounts, setProductCounts] = useState({});
    const getCurrentMonth = () => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentDate = new Date();
        return months[currentDate.getMonth()];
    };

    const getCurrentWeek = () => {
        const currentDate = new Date();

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString(undefined, options);

        const isoWeek = currentDate.toLocaleDateString(undefined, { week: 'iso' });

        return `${formattedDate}`;
    };



    return (
        <View style={styles.containerw}>
            <ScrollView style={styles.containerw1} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <FontAwesomeIcon icon={faCircleUser} size={30} style={styles.uicon} />
                        <Text style={styles.utext}>Hello, Customer name</Text>
                    </View>
                </View>
                <View style={{ marginVertical: 30, marginBottom: 90, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Image source={require("../Streetmall/Dashboard/ICON2.png")} />
                        <View style={{ alignItems: 'center', marginVertical: 10, }}>
                            <Text style={{ backgroundColor: '#FFAC2F', borderRadius: 10, padding: 10, paddingHorizontal: 40, color: 'white', textAlign: 'center' }}>
                                123 456
                            </Text>
                        </View>
                    </View>
                    <View style={{ margin: 15 }}>
                        <View style={styles.rowContainer}>
                            <Text>TOTAL CUSTOMERS REFERRED</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.valueText}>25</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text>WEEKLY INCOME</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.valueText}>₹5,000</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ margin: 0, }}>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                            {getCurrentWeek()}
                        </Text>
                        <LineChart
                            data={chartData}
                            width={screenWidth}
                            height={220}
                            yAxisInterval={1}
                            chartConfig={{
                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(25, 119, 243, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(25, 119, 243, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: '6',
                                    strokeWidth: '2',
                                    stroke: '#003478',
                                },
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    </View>

                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
            <View style={styles.blueBar}></View>
        </View>
    );
};




const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    uicon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 10,
        marginLeft: 20,
      },
      utext: {
        color: 'white',
        flex: 1,
        fontSize: 31,
      },
    button: {
        width: 80,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    valueText: {
        color: '#ffffff',
        textAlign: 'center',
    },
    containerw: {
        flex: 1,
        height: '100%',
        backgroundColor: '#ffffff',
    },
    containerw1: {
        flex: 1,
        backgroundColor: '#ffffff',
        height: '80%',
    },
    blueBar: {
        backgroundColor: '#1977F3',
        height: 15,
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
    },
    container: {
        paddingTop: 100,
        backgroundColor: "#1977F3",
        paddingBottom: 15,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        alignSelf: 'center',
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
        fontSize: 16,
    },
    trackbar: {
        alignSelf: 'center',
        aspectRatio: 9,
        resizeMode: 'contain',
    },
    buttonContainer: {
        marginTop: 16,
    },
    header: {
        backgroundColor: '#1977F3',
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    orderStatusContainer: {
        padding: 20,
    },
    statusItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    statusIconContainer: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    statusTextContainer: {
        flex: 1,
    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statusDate: {
        fontSize: 14,
        color: '#888888',
    },
    claimimg: {
        width: '58%',
        height: '3%',
    },
    chtext: {
        alignSelf: 'center',
        color: '#C80000',
        paddingBottom: 30,
    },
    cont: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    leftContainer: {
        width: '40%',
        alignItems: 'center',
    },
    rightContainer: {
        width: '60%',
        marginLeft: 10,
    },
    productImage: {
        width: '100%',
        height: 130,
        resizeMode: 'contain',
        borderRadius: 8,
    },
    productName: {
        fontSize: 15,
        fontWeight: '500',
    },
    productDetailoffcont: {
        backgroundColor: '#871818',
        borderRadius: 14,
        padding: 2,
        marginTop: 5,
        width: '25%',
    },
    productDetailoff: {
        color: 'white',
        fontSize: 9,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    productDetailpri: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    productDetaildel: {
        fontSize: 10,
        marginTop: 3,
        color: 'blue',
    },
    productDetailst: {
        fontSize: 11,
        marginTop: 5,
        fontWeight: '800',
        color: 'brown',
    },
    productCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 40,
        backgroundColor: '#FFAC2F',
    },
    countButton: {
        width: '30%',
        backgroundColor: '#E0DCDC',
        borderRadius: 30,
        padding: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    deleteButton: {
        width: '30%',
        backgroundColor: '#E0DCDC',
        borderRadius: 30,
        padding: 5,
        alignItems: 'center',
    },
    productCountText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    sbuttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    lstimage: {
        alignSelf: 'center',
    },
    chtext: {
        alignSelf: 'center',
        color: '#C80000',
        paddingBottom: 60,
    },
    trackbar: {
        alignSelf: 'center',
        aspectRatio: 2.9,
        resizeMode: 'contain',
    },
    tracktext: {
        paddingTop: 10,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#003478',
        paddingRight: 20,
        paddingLeft: 33,
    },
    trackcont: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    proceedButton: {
        backgroundColor: '#FF9900',
        borderRadius: 16,
        padding: 13,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        marginRight: 10,
    },
    locationText: {
        fontSize: 16,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    emiDetailsText: {
        fontSize: 16,
        marginTop: 5,
    },
    freeDeliveryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    checkCircleIcon: {
        marginRight: 10,
    },
    freeDeliveryText: {
        fontSize: 16,
    },
});

export default Dashboard;