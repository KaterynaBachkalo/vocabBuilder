import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import logo from "../images/Logo_Craftwork.png";

const Home = () => {
  return (
    <>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.subtitle}>VocabBuilder</Text>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#85AA9F",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
  },
  subtitle: {
    fontFamily: "MacPawFixelDisplay_600",
    fontSize: 22,
    lineHeight: 32,
    color: "#FCFCFC",
  },
});
