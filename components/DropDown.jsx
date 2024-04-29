import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Shadow } from "react-native-shadow-2";

const windowWidth = Dimensions.get("window").width;

const DropDown = () => {
  return (
    <Shadow distance={47} startColor={"rgba(18, 20, 23, 0.08)"} offset={[0, 4]}>
      <View style={styles.container}>
        <Text>Verb</Text>
        <Text>Participle</Text>
        <Text>Noun</Text>
        <Text>Adjective</Text>
        <Text>Pronoun</Text>
        <Text>Numerals</Text>
        <Text>Adverb</Text>
        <Text>Preposition</Text>
        <Text>Conjuction</Text>
        <Text>Phrasal verb</Text>
        <Text>Functional phrase</Text>
      </View>
    </Shadow>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: windowWidth - 36,
    top: 8,

    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
    zIndex: 100,
  },
});
