import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import BottomBar from './BottomBar';

const Manager2 = ({ navigation }) => {
    const handleMenswearPress = () => {
        navigation.navigate('Menswear');
    };

    return (
        <View style={styles.containerw}>
            <View style={styles.all}>
                <View style={styles.container} >
                <FontAwesomeIcon icon={faCircleUser} style={styles.icon} size={30} />
                <Text style={styles.headerText}>Regional Manager</Text>
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.infoContainer}>
                    <View style={{  flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,}}>
                        <Text style={styles.infoLabel}>Name:</Text>
                        <Text style={styles.infoText}>Account holder</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.infoLabel}>Age:</Text>
                        <Text style={styles.infoText}>17</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.infoLabel}>DOB:</Text>
                        <Text style={styles.infoText}>dd/mm/yy</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.infoLabel}>Mobile Number:</Text>
                        <Text style={styles.infoText}>99999999999</Text>
                    </View>

                    <View style={styles.addressContainer}>
                        <Text style={styles.infoLabel}>Address:</Text>
                        <View style={styles.addressDetails}>
                            <Text>Address Line 1:</Text>
                            <Text style={styles.infoText}>No.123, 1st cross street, ABC Avenue, DEF Nagar, Area.</Text>
                        </View>
                        <View style={styles.addressDetails}>
                            <Text>Address Line 2:</Text>
                            <View style={styles.addressSubDetails}>
                                <Text style={{color:'#666',}}>CityName: QWERTY</Text>
                                <Text style={{color:'#666'}}>PinCode: 600000</Text>
                            </View>
                        </View>
                        <View style={styles.infoSection}>
                            <Text style={styles.infoLabel}>Referred:</Text>
                            <Text style={styles.referredText}>00</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
</View>
            <BottomBar navigation={navigation} initialPage="Category" />
            <View style={styles.blueBar}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3E6FD',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: '#1977F3',
    },
    icon: {
        color: '#fff',
        marginRight: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingHorizontal: 15,
        backgroundColor:'#fff',
    },
    infoContainer: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
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
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#333',
    },
    infoText: {
        marginLeft: 10,
        color: '#666',
    },
    addressContainer: {
        marginTop: 15,
    },
    addressDetails: {
        flexDirection: 'column',
    },
    addressSubDetails: {
        marginLeft: 10,
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
    },
    addressText: {
        marginVertical: 10,
    },
    referredText: {
        backgroundColor: '#FFAC2F',
        color: '#fff',
        width: 150,
        textAlign: 'center',
        paddingVertical: 10,
        borderRadius: 10,
    },
});

export default Manager2;
