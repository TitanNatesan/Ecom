import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleRight,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "./UserContext";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { Colors, Spacing, FontSizes, BorderRadius } from "../styles/CommonStyles";

const CodeVerify = require("../Streetmall/2OTP/Group351.png");
library.add(faCircleRight, faUser, faLock);

const CodeVerification = ({ navigation }) => {
  const { userID, BASE_URL } = useUserContext();
  const [error, setError] = useState(null);
  const [inputOTP, setInputOTP] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendSuccessMessage, setResendSuccessMessage] = useState("");

  const inputs = Array(4).fill(null);
  const refs = inputs.map(() => useRef(null));

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && index > 0) {
      refs[index - 1].current.focus();
    } else if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/verify/`,
        {
          username: userID,
          otp: inputOTP,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data === "Pass") {
        navigation.navigate("Forget");
      } else {
        setError(response.data["message"]);
        console.error("OTP verification failed:", response.data);
      }
    } catch (error) {
      console.error("Error during OTP verification: ", error);
    }
  };

  const [resendButtonText, setResendButtonText] = useState("Resend");

  const resendOTP = async () => {
    try {
      setResendButtonText("OTP Sent Successfully!✨");

      setTimeout(() => {
        setResendButtonText("Resend");
      }, 4000);

      const response = await axios.post(
        `${BASE_URL}/api/resend/`,
        {
          username: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("otp resend error", error);
    }
  };
  useEffect(() => {
    return () => {
      setSuccessMessage("");
    };
  }, []);

  return (
    <View style={styles.container}>
      {resendSuccessMessage !== "" && (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>{resendSuccessMessage}</Text>
        </View>
      )}
      {successMessage !== "" && (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>{successMessage}</Text>
        </View>
      )}
      <Text style={styles.last}>Last Step!</Text>
      <Image style={styles.tinyLogo} source={CodeVerify} />
      <View style={styles.allsignIn}>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>Code Verification</Text>
        </View>
        <Text style={styles.description}>Enter Verification code here</Text>
        <View style={styles.allinput}>
          {inputs.map((_, index) => (
            <TextInput
              key={index}
              ref={refs[index]}
              style={styles.inputContainer}
              maxLength={1}
              keyboardType="numeric"
              value={inputOTP[index] || ""}
              onChangeText={(text) => {
                setInputOTP((prevOTP) => {
                  const newOTP = [...prevOTP];
                  newOTP[index] = text;
                  return newOTP;
                });
              }}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(index, nativeEvent.key)
              }
            />
          ))}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.loginButton} onPress={verifyOTP}>
            <Text style={styles.loginButtonText}>Verify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={resendOTP}
            style={{ textAlign: "center", fontSize: 17, marginTop: 25 }}
          >
            <Text style={{ textAlign: "center", color: Colors.text }}>{resendButtonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  allsignIn: {
    backgroundColor: Colors.white,
    paddingTop: 50,
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingBottom: 130,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  },
  successMessageContainer: {
    backgroundColor: "#DFF6DD",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  successMessageText: {
    color: Colors.text,
    textAlign: "center",
  },
  errorText: {
    color: "#FF6B6B",
    textAlign: "center",
    marginTop: -100,
  },
  last: {
    position: "absolute",
    top: 100,
    left: 20,
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.white,
  },
  description: {
    width: "100%",
    marginLeft: "10%",
    color: Colors.textLight,
  },
  buttons: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  loginButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    width: 120,
    alignSelf: "center",
    marginTop: 30,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  allinput: {
    flexDirection: "row",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
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
    width: "100%",
    height: "50%",
    top: 0,
    position: "absolute",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
    color: Colors.text,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "#F7FAFF",
    borderRadius: 8,
    margin: 5,
    marginHorizontal: 25,
    width: 48,
    height: 48,
  },
  icon: {
    marginRight: 10,
  },
});

export default CodeVerification;