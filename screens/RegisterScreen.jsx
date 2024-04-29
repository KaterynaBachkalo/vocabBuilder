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
import RegisterForm from "../components/RegisterForm";

const windowWidth = Dimensions.get("window").width;

export default function Register() {
  return (
    <ScrollView contentContainerStyle={styles.scrollcontainer}>
      <Image source={image} style={styles.backgroundImage} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <RegisterForm />
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
    backgroundColor: "#F8F8F8",
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
