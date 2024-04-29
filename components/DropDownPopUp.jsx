import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const DropDownPopUp = () => {
  return (
    <View style={styles.container}>
      <Text>Verb</Text>
      <Text>Participle</Text>
      <Text>Noun</Text>
      <Text>Adjective</Text>
      <Text>Pronoun</Text>
      <Text>Numerals</Text>
      <Text>Adverb</Text>
    </View>
  );
};

export default DropDownPopUp;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: windowWidth - 32 - 32,
    top: 50,

    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
    zIndex: 100,
    shadowColor: "rgb(18, 20, 23)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    elevation: 2,
  },
});
