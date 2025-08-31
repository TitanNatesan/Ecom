//Login.js
import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useUserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CommonStyles,
  Colors,
  Spacing,
  FontSizes,
  BorderRadius,
  Shadows
} from "../styles/CommonStyles";
import { Input, Button, LoadingComponent } from "../components";
import { validation } from "../utils/helpers";
import Round from "../Streetmall/3_Login/Ellipse391.png";
import signInImage from "../Streetmall/3_Login/ASSETS.png";

const SignInScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const { updateUserID, BASE_URL } = useUserContext();

  useEffect(() => {
    checkAutoLogin();
  }, []);

  const checkAutoLogin = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");

      if (storedUsername && storedPassword) {
        setUserName(storedUsername);
        setPassword(storedPassword);
        setRememberPassword(true);

        try {
          const response = await axios.post(
            `${BASE_URL}/api/login/`,
            {
              username: storedUsername,
              password: storedPassword,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data === 1) {
            updateUserID(storedUsername);
            navHome();
            return;
          }
        } catch (error) {
          console.error("Auto-login failed:", error.message);
          // Clear invalid credentials
          await AsyncStorage.removeItem("username");
          await AsyncStorage.removeItem("password");
        }
      }
    } catch (error) {
      console.error("Error checking auto-login:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate username
    const usernameError = validation.required(username);
    if (usernameError) {
      errors.username = usernameError;
    }

    // Validate password
    const passwordError = validation.required(password);
    if (passwordError) {
      errors.password = passwordError;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRememberPassword = () => {
    setRememberPassword(!rememberPassword);
  };

  const navSignup = () => {
    navigation.navigate("Signup");
  };

  const navHome = () => {
    navigation.navigate("Home", { username });
  };

  const navForgetPassword = async () => {
    if (!username.trim()) {
      setErrorMessage("Please enter your username first for OTP verification");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/forgetpass/`, {
        username: username.trim(),
      });

      if (response.data === 'Sent') {
        updateUserID(username);
        navigation.navigate("CodeVerification");
      } else {
        setErrorMessage(response.data);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setErrorMessage("Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveCredentialsToCache = async (username, password) => {
    try {
      if (rememberPassword) {
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("password", password);
      } else {
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("password");
      }
    } catch (error) {
      console.error("Error saving credentials to cache:", error);
    }
  };

  const LoginReq = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await axios.post(
        `${BASE_URL}/api/login/`,
        {
          username: username.trim(),
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data === 1) {
        updateUserID(username);
        await saveCredentialsToCache(username, password);
        navHome();
      } else {
        setErrorMessage(response.data?.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response?.status === 401) {
        setErrorMessage("Invalid username or password");
      } else if (error.response?.status >= 500) {
        setErrorMessage("Server error. Please try again later.");
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Background Image */}
        <Image style={styles.round} source={Round} />
        <Image style={styles.backgroundImage} source={signInImage} />

        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.backText}>back!</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Login</Text>
          </View>

          {errorMessage && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* Username Input */}
          <Input
            label="Username"
            value={username}
            onChangeText={setUserName}
            placeholder="Enter your username"
            leftIcon="user"
            autoCapitalize="none"
            error={formErrors.username}
            editable={!loading}
            containerStyle={styles.inputContainer}
          />

          {/* Password Input */}
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={true}
            showPasswordToggle={true}
            leftIcon="lock"
            error={formErrors.password}
            editable={!loading}
            containerStyle={styles.inputContainer}
          />

          {/* Remember & Forgot Password */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={handleRememberPassword}
              style={styles.rememberContainer}
              disabled={loading}
            >
              <FontAwesome
                name={rememberPassword ? "check-square" : "square-o"}
                size={18}
                color={Colors.primary}
              />
              <Text style={styles.rememberText}>Remember Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={navForgetPassword}
              disabled={loading}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <Button
            title="Login"
            onPress={LoginReq}
            loading={loading}
            variant="primary"
            size="large"
            style={styles.loginButton}
          />

          {/* Create Account Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={navSignup} disabled={loading}>
              <Text style={styles.signupLink}>Create New Account</Text>
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

  round: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },

  backgroundImage: {
    width: 280,
    height: 300,
    position: "absolute",
    top: 100,
    right: 0,
    zIndex: 1,
    resizeMode: 'contain',
  },

  welcomeContainer: {
    position: "absolute",
    top: 80,
    left: Spacing.lg,
    zIndex: 2,
  },

  welcomeText: {
    fontSize: FontSizes.display + 8,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: -8,
  },

  backText: {
    fontSize: FontSizes.heading,
    fontWeight: "bold",
    color: Colors.secondary,
  },

  formContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: '55%',
    ...Shadows.heavy,
  },

  formHeader: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  formTitle: {
    fontSize: FontSizes.title,
    fontWeight: "bold",
    color: Colors.text,
  },

  errorContainer: {
    backgroundColor: Colors.error + '20',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },

  errorText: {
    color: Colors.error,
    fontSize: FontSizes.sm,
    textAlign: "center",
    fontWeight: '500',
  },

  inputContainer: {
    marginBottom: Spacing.md,
  },

  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: Spacing.lg,
  },

  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  rememberText: {
    marginLeft: Spacing.sm,
    fontSize: FontSizes.sm,
    color: Colors.textLight,
    fontWeight: '500',
  },

  forgotText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  loginButton: {
    marginTop: Spacing.md,
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.xl,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },

  signupText: {
    fontSize: FontSizes.md,
    color: Colors.textLight,
    fontWeight: '400',
  },

  signupLink: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;