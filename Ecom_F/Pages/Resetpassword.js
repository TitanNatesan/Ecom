import React, { useState } from "react";
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
import {
  faCircleRight,
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import axios
import signInImage from "../Streetmall/3_Login/ASSETS.png";
import { useUserContext } from "./UserContext";

library.add(faCircleRight, faUser, faLock, faEye, faEyeSlash);

const ResetPasswordScreen = ({ navigation }) => {
  const { userID,BASE_URL } = useUserContext();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/api/resetpass/`,
        {
          username: username,
          old_password: currentPassword,
          new_password: newPassword,
        }
      );

      if (response.data === 1) {
        navigation.navigate("Login");
      } else {
        
        setErrorMessage(response.data["message"]);
      }
    } catch (error) {
      console.error("Password Reset failed:", error.message);
      setErrorMessage("Password reset failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={signInImage} />
      <View style={styles.overlay} />
      <Text style={styles.heading}>Reset Password</Text>
      <View style={styles.allsignIn}>
        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            secureTextEntry={!showPassword}
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
          />

          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleResetPassword}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
          <Text
            style={{ fontSize: 13, paddingVertical: 5, marginVertical: 20 }}
            onPress={() => {
              navigation.navigate("CodeVerification");
            }}
          >
            Forget Password?
          </Text> 
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1977F3",
    justifyContent: "center",
    padding: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(25, 119, 243, 0.7)",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  allsignIn: {
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "white",
  },
  icon: {
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    alignSelf: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#1977F3",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default ResetPasswordScreen;
