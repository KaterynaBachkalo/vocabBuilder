import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconPlus from "../images/icons/plus.svg";
import { useNavigation } from "@react-navigation/native";

const AddWordBtn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Add word</Text>
      <TouchableOpacity onPress={() => navigation.navigate("AddWordScreen")}>
        <IconPlus />
      </TouchableOpacity>
    </View>
  );
};

export default AddWordBtn;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    color: "rgb(18, 20, 23)",
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 16,
    lineHeight: 22,
  },
});
