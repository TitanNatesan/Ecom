import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
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
import { CommonStyles, Colors, Spacing, FontSizes, BorderRadius } from "../styles/CommonStyles";
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
      } else if (response.data['error']) {
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Background Image */}
        <Image style={styles.backgroundImage} source={signupImage} />

        {/* Signup Form */}
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Sign up</Text>
          </View>

          {errorMessage && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* Dealer ID Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Dealer ID"
                placeholderTextColor={Colors.textLight}
                value={referal}
                onChangeText={setReferal}
                autoCapitalize="none"
              />
              <FontAwesomeIcon
                icon={faPeopleLine}
                size={18}
                color={Colors.textLight}
                style={styles.inputIcon}
              />
            </View>
          </View>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={Colors.textLight}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              <FontAwesomeIcon
                icon={faUser}
                size={18}
                color={Colors.textLight}
                style={styles.inputIcon}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.textLight}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPass}
              />
              <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeButton}>
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  size={18}
                  color={Colors.textLight}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Re-enter Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Re-Enter Password"
                placeholderTextColor={Colors.textLight}
                secureTextEntry={!showPassword}
                value={reEnterPassword}
                onChangeText={setReEnterPassword}
              />
              <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeButton}>
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  size={18}
                  color={Colors.textLight}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Password Checkbox */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
            />
            <Text style={styles.rememberText}>Remember Password</Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLoginPress}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  backgroundImage: {
    width: '100%',
    height: '55%',
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },

  formContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: '60%',
  },

  formHeader: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  formTitle: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.text,
  },

  errorContainer: {
    backgroundColor: Colors.error + '20',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
  },

  errorText: {
    color: Colors.error,
    fontSize: FontSizes.sm,
    textAlign: 'center',
    fontWeight: '500',
  },

  inputContainer: {
    marginBottom: Spacing.md,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing.sm,
  },

  input: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text,
    paddingVertical: Spacing.sm,
  },

  inputIcon: {
    marginLeft: Spacing.sm,
  },

  eyeButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },

  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    marginLeft: 0,
  },

  checkboxText: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
  },

  rememberText: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
    marginLeft: -10,
  },

  signupButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
    ...CommonStyles.primaryButton.shadowColor && CommonStyles.primaryButton,
  },

  signupButtonText: {
    color: Colors.white,
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },

  loginText: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
  },

  loginLink: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default SignupScreen;
