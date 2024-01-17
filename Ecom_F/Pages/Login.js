import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library, text } from '@fortawesome/fontawesome-svg-core';
import { faCircleRight, faLock, faPeopleLine, faUser } from '@fortawesome/free-solid-svg-icons';
const signInImage = require('../Streetmall/3_Login/ASSETS.png');
const Round = require('../Streetmall/3_Login/Ellipse391.png');
import axios from 'axios';
import { BASE_URL } from '../App';
import { useUserContext } from './UserContext';

library.add(faCircleRight, faPeopleLine, faUser, faLock);

const SignInScreen = ({ navigation }) => {

    const navHome = () => {
        navigation.navigate('Home', { username });
        updateUserID(username);
    };
    const navsignup = () => {
        navigation.navigate("Signup");
    };
    const { userID, updateUserID } = useUserContext();
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const LoginReq = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/login/`, {
                username: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data == 1) {
                navHome();
            }
            else {
                navLogin();
            }
        } catch (error) {
            console.error('Signup failed:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.back}>back!</Text>
            <Image style={styles.round} source={Round} />
            <Image style={styles.tinyLogo} source={signInImage} />
            <View style={styles.allsignIn}>
                <View style={styles.rowContainer}>
                    <Text style={styles.text}>Login</Text>
                    <TouchableOpacity
                        onPress={LoginReq}>
                        <FontAwesomeIcon icon={faCircleRight} size={50} color="#1977F3" /></TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Username" onChangeText={text => setUserName(text)} />
                    <FontAwesomeIcon icon={faUser} size={20} color="black" style={styles.icon} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={text => setPassword(text)} />
                    <FontAwesomeIcon icon={faLock} size={20} color="black" style={styles.icon} />
                </View>
                <View>
                    <Text style={styles.forget}>Forget Password</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={navsignup} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Create New Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style='auto' />
        </View>
    );
};

const styles = StyleSheet.create({
    allsignIn: {
        backgroundColor: 'white',
        paddingTop: 30,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        paddingBottom: 100,
        marginBottom: 0,
        borderRadius: 30,
    },
    round: {
        width: 200,
        height: 200,
        position: 'absolute',
        top: 0,
        zIndex: 10,
    },
    welcome: {
        position: 'absolute',
        top: 50,
        left: 20,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    back: {
        position: 'absolute',
        top: 100,
        left: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1977F3',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    loginButton: {
        backgroundColor: '#1977F3',
        padding: 10,
        borderRadius: 10,
        width: 150,
        alignSelf: 'center',
        marginTop: 30,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    remember: {
        marginLeft: -13,
    },
    forget: {
        color: '#1977F3',
        flex: 1,
        alignSelf: 'center',
        top: 20,
        bottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-center',
        marginVertical: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#1977F3',
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
        width: 230,
        height: 250,
        top: 120,
        right: 0,
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
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "gray",
        borderRadius: 6,
        margin: 5,
        marginHorizontal: 25,
        padding: 5,
    },
    input: {
        flex: 1,
        height: 40,
        padding: 5,
    },
    icon: {
        marginRight: 10,
    },
});

export default SignInScreen;