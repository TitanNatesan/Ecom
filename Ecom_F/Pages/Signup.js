import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleRight, faLock, faPeopleLine, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, CheckBox } from 'react-native-elements';
const signupImage = require('../Streetmall/1_SignUp/back_asset.png');
import axios from 'axios';


axios.defaults.debug = true;
library.add(faCircleRight, faPeopleLine, faUser, faLock);
const SignupScreen = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false);

    var [referralId, setReferralId] = useState('');
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };
    const handleVerifyPress = () => {
        navigation.navigate('CodeVerification');
    };

    const handleSignup = async () => {
        console.log("buttonTapped",referralId,username,password)
        try {
          const response = await axios.post('http://10.0.2.2:8000/api/signup/', { 
            referal_id: referralId,
            username: username,
            password: password
          }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
      
          // Handle the response, e.g., show a success message or navigate to another screen
          console.log('Signup successful:', response.data);
      
        } catch (error) {
          // Handle errors, e.g., display an error message to the user
          console.error('Signup failed:', error.message);
        }
      };
      

    return (
        <View style={styles.container}>
            <Image style={styles.tinyLogo} source={signupImage} />
            <View style={styles.allsignup}>
                <View style={styles.rowContainer}>
                    <Text style={styles.text}>Sign up</Text>
                    <TouchableOpacity onPress={handleSignup}>
                        <FontAwesomeIcon icon={faCircleRight} size={50} color="#1977F3" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Referral ID" value={referralId} onChange={text => setReferralId(text)}/>
                    <FontAwesomeIcon icon={faPeopleLine} size={20} color="black" style={styles.icon} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Username" value={referralId} onChange={text => setUsername(text)}/>
                    <FontAwesomeIcon icon={faUser} size={20} color="black" style={styles.icon} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={referralId} onChange={text => setPassword(text)}/>
                    <FontAwesomeIcon icon={faLock} size={20} color="black" style={styles.icon} />
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox checked={isChecked} onPress={() => setChecked(!isChecked)} />
                    <Text style={styles.remember}>Remember Password </Text>
                    
                </View>
                <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    allsignup: {
        backgroundColor: 'white',
        paddingTop: 30,
        marginTop: 350,
        paddingBottom: 120,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: '#1977F3',
        padding: 10,
        borderRadius: 10,
        width: 120,
        alignSelf: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    remember: {
        marginLeft: -13,
    },
    forget: {
        color: '#1977F3',
        marginLeft: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-center',
        marginVertical: 10,
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
        width: 360,
        height: 350,
        top: 30,
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

export default SignupScreen;
