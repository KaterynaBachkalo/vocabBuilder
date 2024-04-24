import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import image from "../images/register-login.png";
import LoginForm from "../components/LoginForm";

const windowWidth = Dimensions.get("window").width;

export default function Login() {
  return (
    <ScrollView contentContainerStyle={styles.scrollcontainer}>
      <Image source={image} style={styles.backgroundImage} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Please enter your login details to continue using our service:
        </Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <LoginForm />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollcontainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#ffffff",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: windowWidth / 2,
    transform: [{ translateX: -247 / 2 }],
    resizeMode: "contain",
    zIndex: -10,
  },

  formContainer: {
    marginTop: "auto",
    justifyContent: "flex-end",
    backgroundColor: "rgb(236, 240, 239)",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 24,
  },
  title: {
    color: "rgb(18, 20, 23)",
    fontFamily: "MacPawFixelDisplay_600",
    fontSize: 30,
    lineHeight: 32,
    letterSpacing: -0.6,
    textAlign: "left",
    marginBottom: 16,
  },
  subtitle: {
    color: "rgb(18, 20, 23)",
    fontFamily: "MacPawFixelDisplay_400",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
    marginBottom: 16,
  },
});
