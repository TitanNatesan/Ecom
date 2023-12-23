import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleRight, faUser } from '@fortawesome/free-solid-svg-icons';

const signupImage = require('../Streetmall/1_SignUp/back_asset.png');
const Round = require('../Streetmall/3_Login/Ellipse391.png');

library.add(faCircleRight, faUser);

const Signup2Screen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [cityName, setCityName] = useState('');
    const [pincode, setPincode] = useState('');
    const [recoveryMail, setRecoveryMail] = useState('');

    const handleVerifyPress = () => {
        // Handle verification logic here
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
                        <Text>Mobile Number:</Text>
                        <TextInput
                            style={styles.input}
                            value={mobileNumber}
                            textContentType='telephoneNumber'
                            keyboardType='numeric'
                            maxLength={10}
                            onChangeText={text => setMobileNumber(text)}
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
                        <Text>City Name:</Text>
                        <TextInput
                            style={styles.input}
                            value={cityName}
                            onChangeText={text => setCityName(text)}
                        />
                        <Text>Pincode:</Text>
                        <TextInput
                            style={styles.input}
                            value={pincode}
                            maxLength={12}
                            keyboardType='numeric'
                            onChangeText={text => setPincode(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Recovery Mail:</Text>
                        <TextInput
                            style={styles.input}
                            value={recoveryMail}
                            keyboardType='email-address'
                            onChangeText={text => setRecoveryMail(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={handleVerifyPress}>
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
        marginTop:'10%',
    },
    allsignup: {
        backgroundColor: 'white',
        paddingTop: 30,
        paddingBottom: 10,
        borderRadius: 30,
        marginTop:'40%',
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
