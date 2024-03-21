import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
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
import {
  faCircleRight,
  faLock,
  faPeopleLine,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { CheckBox } from "react-native-elements";
const signupImage = require("../Streetmall/1_SignUp/back_asset.png");
import axios from "axios";
import { useUserContext } from "./UserContext";

axios.defaults.debug = true;
library.add(faCircleRight, faPeopleLine, faUser, faLock, faEye, faEyeSlash);
const SignupScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [referal, setReferal] = useState("");
  const [password, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { BASE_URL } = useUserContext();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };
  const handleSignup2 = (referal, username, password) => {
    navigation.navigate("Signup2", { referal, username, password });
  };

  const handleSignup = async () => {
    console.log("buttonTapped");
    try {
      if (password !== reEnterPassword) {
        // Check if password and re-entered password match
        console.error("Passwords do not match");
        // You can show an error message to the user or handle it in your way
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/api/signup1/`,
        {
          referal: referal,
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response, e.g., show a success message or navigate to another screen
      console.log("Signup1 successful:", response.data);
      if (response.data === 1) {
        handleSignup2(referal, username, password);
      } else if (response.data['error']){
        setErrorMessage(response.data['error'])
      }
      else {
        navigation.navigate("Signup");
        setErrorMessage(response.data["message"]);
      }
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Signup failed:", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={signupImage} />
      <View style={styles.allsignup}>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>Sign up</Text>
        </View>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Dealer ID"
            onChangeText={(text) => setReferal(text)}
          />
          <FontAwesomeIcon
            icon={faPeopleLine}
            size={20}
            color="black"
            style={styles.icon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
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
            onChangeText={(text) => setPass(text)}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              size={20}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Re-Enter Password"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setReEnterPassword(text)}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              size={20}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={isChecked}
            onPress={() => setChecked(!isChecked)}
          />
          <Text style={styles.remember}>Remember Password </Text>
        </View>
        <TouchableOpacity onPress={handleSignup} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View
          onPress={handleLoginPress}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text onPress={handleLoginPress} style={{ color: "#1977F3" }}>
            Login
          </Text>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  allsignup: {
    backgroundColor: "white",
    paddingTop: 30,
    marginTop: 350,
    paddingBottom: 120,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#1977F3",
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignSelf: "center",
    marginTop: 30,
  },
  loginButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  remember: {
    marginLeft: -10,
  },
  forget: {
    color: "#1977F3",
    marginLeft: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-center",
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#1977F3",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  tinyLogo: {
    width: 360,
    height: 350,
    top: 30,
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

export default SignupScreen;
