import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleRight, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const CodeVerify = require('../Streetmall/2OTP/Group351.png');
library.add(faCircleRight, faUser, faLock);

const CodeVerification = ({ navigation }) => {
    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    const inputs = Array(4).fill(null);
    const refs = inputs.map(() => useRef(null));

    const handleKeyPress = (index, key) => {
        if (key === 'Backspace' && index > 0) {
            refs[index - 1].current.focus();
        } else if (index < inputs.length - 1) {
            refs[index + 1].current.focus();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.last} >Last Step!</Text>
            <Image style={styles.tinyLogo} source={CodeVerify} />
            <View style={styles.allsignIn}>
                <View style={styles.rowContainer}>
                    <Text style={styles.text}>Code Verification</Text>
                    <FontAwesomeIcon icon={faCircleRight} size={50} color="#1977F3" />
                </View>
                <Text style={styles.description}>Enter Verification code here</Text>
                <View style={styles.allinput}>
                    {inputs.map((_, index) => (
                        <TextInput
                            key={index}
                            ref={refs[index]}
                            style={styles.inputContainer}
                            maxLength={1}
                            keyboardType='numeric'
                            onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                        />
                    ))}
                </View> 
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleHomePress}>
                        <Text style={styles.loginButtonText}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    allsignIn: {
        backgroundColor: 'white',
        paddingTop: 50,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        paddingBottom: 130,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
    },
    last: {
        position: 'absolute',
        top: 100,
        left: 20,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    description: {
        width: '100%',
        marginLeft: '10%',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    loginButton: {
        backgroundColor: '#1977F3',
        padding: 10,
        borderRadius: 10,
        width: 120,
        alignSelf: 'center',
        marginTop: 30,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    allinput: {
        flexDirection: 'row',
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#00ADEF',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 20,
    },
    tinyLogo: {
        width: '100%', // occupy the entire width of the screen
        height: '50%', // adjust the height as needed
        top: 0,
        position: 'absolute',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 6,
        margin: 5,
        marginHorizontal: 25,
        padding: 5,
        width: 40,
        height: 40,
    },

    icon: {
        marginRight: 10,
    },
});

export default CodeVerification;
