import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import IconArrow from "../images/icons/arrow.svg";

const Menu = () => {
  return (
    <View style={{ gap: 28 }}>
      <TouchableOpacity style={styles.buttonActive}>
        <Text style={styles.buttonActiveText}>Dictionary</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Recommend</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Training</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logOut}>
        <Text style={styles.buttonText}>Log out</Text>
        <IconArrow />
      </TouchableOpacity>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  logOut: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonActive: {
    backgroundColor: "rgb(252, 252, 252)",
    padding: 12,
    borderRadius: 15,
  },
  button: {},

  buttonActiveText: {
    color: "rgb(18, 20, 23)",
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  buttonText: {
    color: "rgb(252, 252, 252)",
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 14,
    lineHeight: 19,
  },
});
