import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  Dimensions,
} from "react-native";

import image from "../images/register-login.png";
import RegisterForm from "../components/RegisterForm";

const windowWidth = Dimensions.get("window").width;

export default function Register() {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.backgroundImage} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </Text>
        <RegisterForm />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#e7e7e7",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 32,
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
