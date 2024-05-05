import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import IconArrow from "../images/icons/arrow.svg";
import { useDispatch } from "react-redux";
import { logOutThunk } from "../redux/auth/operations";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogOut = () => {
    try {
      dispatch(logOutThunk());
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

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
      <TouchableOpacity style={styles.logOut} onPress={handleLogOut}>
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
