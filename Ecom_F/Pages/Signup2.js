import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRoute } from "@react-navigation/native";
import { BASE_URL } from '../App';

library.add(faCircleRight, faUser);

const Signup2Screen = ({ navigation }) => {
    const route = useRoute();
    const { referal, username, password } = route.params;
    const [name, setName] = useState('');
    const [door_number, setDr] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [cityName, setCityName] = useState('');
    const [pincode, setPincode] = useState('');

    const navLogin = () => {
        navigation.navigate('Login');
    };

    const reqData = {
        name: name,
        username: username,
        password: password,
        referal: referal,
        phone: "+91" + mobileNumber,
        email: email,
        'address': {
            door_number: door_number, 
            address_line1: addressLine1,
            address_line2: addressLine2,
            city: cityName,
            state: "TamilNadu (default)",
            postal_code: pincode,
            country: "India (default)",
            landmark: "null",
        }, 
    };
    const handleSignup2 = async () => {
        console.log("buttonTapped")
        try {
            const response = await axios.post(`${BASE_URL}/api/signup/`, reqData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            console.log('Request Sent:', response.data);
            if (response.data == "1") {
                navLogin();
            }
            else {
                navigation.navigate('Signup');
            }
        }
        catch (error) {
            // Handle errors, e.g., display an error message to the user
            console.error('Signup failed:', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcome}>Welcome</Text>
            </View>
            <View style={styles.allsignup}>
                <Text style={styles.signupText}>Sign up</Text>
                <View style={styles.inputContainer}>
                    <Text>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        keyboardType='email-address'
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Mobile Number (+91):</Text>
                    <TextInput
                        style={styles.input}
                        value={mobileNumber}
                        textContentType='telephoneNumber'
                        keyboardType='numeric'
                        maxLength={15}
                        onChangeText={text => setMobileNumber(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Door No.:</Text>
                    <TextInput
                        multiline={true}
                        style={styles.input}
                        value={door_number}
                        onChangeText={text => setDr(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Address Line 1:</Text>
                    <TextInput
                        multiline={true}
                        style={styles.input}
                        value={addressLine1}
                        onChangeText={text => setAddressLine1(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Address Line 2:</Text>
                    <TextInput
                        style={styles.input}
                        value={addressLine2}
                        onChangeText={text => setAddressLine2(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>City :</Text>
                    <TextInput
                        style={styles.input}
                        value={cityName}
                        onChangeText={text => setCityName(text)}
                    />
                    <Text>Pincode :</Text>
                    <TextInput
                        style={styles.input}
                        value={pincode}
                        maxLength={12}
                        keyboardType='numeric'
                        onChangeText={text => setPincode(text)}
                    />
                </View>
                <TouchableOpacity onPress={handleSignup2}>
                    <FontAwesomeIcon icon={faCircleRight} style={styles.verifyIcon} size={50} color="#1977F3" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1977F3',
    },
    header: {
        alignItems: 'center',
        marginTop: '10%',
    },
    allsignup: {
        backgroundColor: 'white',
        paddingTop: 30,
        paddingBottom: 10,
        borderRadius: 30,
        marginTop: '40%',
    },
    signupText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 30,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        marginHorizontal: 25,
        padding: 5,
    },
    input: {
        flex: 1,
        height: 40,
        padding: 5,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: 'gray',
        borderRadius: 6,
    },
    verifyIcon: {
        alignSelf: 'center',
        margin: 20,
        padding: 20,
    },
    welcome: {
        position: 'absolute',
        top: '6%',
        left: '10%',
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
    },
    round: {
        width: 200,
        height: 200,
        position: 'absolute',
        top: 0,
        zIndex: 10,
    },
});

export default Signup2Screen;
