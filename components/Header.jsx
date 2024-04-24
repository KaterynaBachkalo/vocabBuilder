import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Nav from "./Nav";
import LogoHeartWhite from "../images/heart-white.png";
import UserLogoDefault from "../images/user-logo-empty.png";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>petl</Text>
        <Image source={LogoHeartWhite} />
        <Text style={styles.logoText}>ve</Text>
      </View>
      <Image source={UserLogoDefault} style={styles.userLogoDefault} />
      <Nav />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
  },
  logoText: {
    color: "rgb(255, 255, 255)",
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 20,
    letterSpacing: -0.8,
    textAlign: "left",
  },
  userLogoDefault: {
    marginRight: 12,
  },
});
