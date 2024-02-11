import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import Icon from "react-native-vector-icons/FontAwesome";

import {
    faCircleRight,
    faLock,
    faUser,
    faEye,
    faEyeSlash,
    faSquare,
    faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useUserContext } from "./UserContext";
import Round from "../Streetmall/3_Login/Ellipse391.png";
import signInImage from "../Streetmall/3_Login/ASSETS.png";
library.add(
    faCircleRight,
    faUser,
    faLock,
    faEye,
    faEyeSlash,
    faSquare,
    faCheckSquare
);

const SignInScreen = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { updateUserID,BASE_URL } = useUserContext();
    const [rememberPassword, setRememberPassword] = useState(false);

    useEffect(() => {
        const retrieveCredentials = async () => {
            try {
                const storedRememberPassword = await AsyncStorage.getItem("rememberPassword");
                const storedUsername = await AsyncStorage.getItem("username");
                const storedPassword = await AsyncStorage.getItem("password");

                if (storedRememberPassword) {
                    setRememberPassword(storedRememberPassword === 'true');
                }
                else{
                    console.log("Not Fount");
                }

                if (storedUsername && storedPassword) {
                    setUserName(storedUsername);
                    setPassword(storedPassword);
                }
            } catch (error) {
                console.error("Error retrieving credentials:", error);
            }
        };

        retrieveCredentials();
    }, []);

    const storeCredentials = async () => {
        try {
            if (rememberPassword) {
                await AsyncStorage.setItem("username", username);
                await AsyncStorage.setItem("password", password);
            } else {
                await AsyncStorage.removeItem("username");
                await AsyncStorage.removeItem("password");
            }
        } catch (error) {
            console.error("Error storing credentials:", error);
        }
    };

    useEffect(() => {
        storeCredentials();
    }, [username, password, rememberPassword]);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleRememberPassword = () => {
        setRememberPassword(!rememberPassword);
    };

    const navSignup = () =>{
        navigation.navigate("Signup");
    }

    const navHome = () => {
        navigation.navigate("Home", { username });
        updateUserID(username);
    };

    const navreset = () => {
        navigation.navigate("Resetpass");
    };

    const LoginReq = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/login/`,
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Login Response:", response.data);

            if (response.data === 1) {
                if (rememberPassword) {
                    storeCredentials(); // Store credentials only if rememberPassword is true and login response is 1
                }
                navHome();
            } else {
                displayError("Incorrect username or password.");
            }
        } catch (error) {
            console.error("Login failed:", error.message);
            displayError("Check your username and password!");
        }
    };

    const displayError = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
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
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={(text) => setUserName(text)}
                    />
                    <FontAwesomeIcon
                        icon={faUser}
                        size={20}
                        color="black"
                        style={styles.icon}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            size={20}
                            color="black"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginTop: 20,
                    }}
                >
                    <TouchableOpacity onPress={handleRememberPassword}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <Icon
                                name={rememberPassword ? "check-square" : "square-o"}
                                size={20}
                            />
                            <Text style={{ marginLeft: 5, color: "#6B5E5E" }}>
                                Remember Password
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navreset}>
                        <Text style={{ color: "#1977F3" }}>Forget Password</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={LoginReq} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <View
                    onPress={navSignup}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                    }}
                >
                    <Text onPress={navSignup} style={{ color: "#1977F3" }}>
                        Create New Account
                    </Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    allsignIn: {
        backgroundColor: "white",
        paddingTop: 30,
        position: "absolute",
        width: "100%",
        bottom: 0,
        paddingBottom: 100,
        marginBottom: 0,
        borderRadius: 30,
    },
    round: {
        width: 200,
        height: 200,
        position: "absolute",
        top: 0,
        zIndex: 10,
    },
    forgetPassword: {
        color: "#1977F3",
        fontSize: 16,
    },
    center: {
        alignItems: "center",
        marginBottom: 10, // Adjusted spacing
    },

    welcome: {
        position: "absolute",
        top: 50,
        left: 20,
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
    },
    back: {
        position: "absolute",
        top: 100,
        left: 20,
        fontSize: 30,
        fontWeight: "bold",
        color: "#1977F3",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignSelf: "center", // Center horizontally
        alignItems: "center", // Center vertically
        marginBottom: 10, // Adjusted spacing
    },
    checkbox: {
        borderRadius: 5,
        padding: 8,
        marginRight: 10,
    },
    rememberText: {
        color: "#1977F3",
        fontSize: 16,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: "#1977F3",
        padding: 10,
        borderRadius: 10,
        width: 120,
        alignSelf: "center",
        marginTop: 20,
    },

    flexibleButton: {
        flex: 1,
        marginHorizontal: 10,
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    loginButton2: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        width: "80%",
        alignSelf: "center",
        marginTop: 10,
    },

    loginButtonText2: {
        color: "#1977F3",
        fontSize: 16,
        fontWeight: "900",
        textAlign: "center",
    },
    containerremember: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 50,
    },
    forget: {
        color: "#1977F3",
        flex: 1,
        alignSelf: "center",
        top: 20,
        bottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "#1977F3",
        justifyContent: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: 20,
    },
    tinyLogo: {
        width: 230,
        height: 250,
        top: 120,
        right: 0,
        position: "absolute",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginRight: 10,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
