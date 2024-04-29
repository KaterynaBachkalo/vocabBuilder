import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Logo from "../images/icons/logo.svg";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate("DictionaryScreen");
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("DictionaryScreen")}
    >
      <Logo />
      <Text style={styles.subtitle}>VocabBuilder</Text>
    </TouchableOpacity>
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
