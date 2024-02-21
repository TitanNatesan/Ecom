import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
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
    faUser,
    faLock,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useUserContext } from "./UserContext";
import Round from "../Streetmall/3_Login/Ellipse391.png";
import signInImage from "../Streetmall/3_Login/ASSETS.png";

library.add(faUser, faLock, faEye, faEyeSlash);

const SignInScreen = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [key,setKey]=useState(0);
    const { updateUserID, BASE_URL, setLogin, login } = useUserContext();

    useEffect(() => {
        if (login) {
            navigation.navigate("Home");
        }
    }, [login, navigation]);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const navSignup = () => {
        navigation.navigate("Signup");
    };

    const navHome = () => {
        updateUserID(username);
        navigation.navigate("Home", { username });
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
                setLogin(true);
                navHome();
                setKey((prevKey) => prevKey + 1);
                setErrorMessage(null);
            } else {
                setErrorMessage(response.data["message"]);
            }
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    return (
        <View style={styles.container} key={key}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.back}>back!</Text>
            <Image style={styles.round} source={Round} />
            <Image style={styles.tinyLogo} source={signInImage} />
            <View style={styles.allsignIn}>
                <View style={styles.rowContainer}>
                    <Text style={styles.text}>Login</Text>
                </View>
                {errorMessage && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                )}
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
    container: {
        flex: 1,
        backgroundColor: "#1977F3",
        justifyContent: "center",
    },
    loginButton: {
        backgroundColor: "#1977F3",
        padding: 10,
        borderRadius: 10,
        width: 120,
        alignSelf: "center",
        marginTop: 20,
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default SignInScreen;
