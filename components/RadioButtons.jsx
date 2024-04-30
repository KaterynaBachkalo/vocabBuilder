import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

const RadioButtons = ({ color, uncheckedColor, colorText }) => {
  const [selectedValue, setSelectedValue] = useState("regular");

  const route = useRoute();

  return (
    <>
      <View style={styles.radioGroup}>
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="regular"
            status={selectedValue === "regular" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("regular")}
            color={color}
            uncheckedColor={uncheckedColor}
          />
          <Text style={[styles.radioLabel, { color: colorText }]}>Regular</Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton.Android
            value="irregular"
            status={selectedValue === "irregular" ? "checked" : "unchecked"}
            onPress={() => setSelectedValue("irregular")}
            color={color}
            uncheckedColor={uncheckedColor}
          />
          <Text style={[styles.radioLabel, { color: colorText }]}>
            Irregular
          </Text>
        </View>
      </View>
      {selectedValue === "irregular" && route.name === "AddWordScreen" && (
        <Text style={styles.text}>
          Such data must be entered in the format I form-II form-III form.
        </Text>
      )}
    </>
  );
};

export default RadioButtons;

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: "row",
    gap: 16,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#eee",
  },
  radioLabel: {
    fontFamily: "MacPawFixelDisplay_400",
    fontSize: 12,
    lineHeight: 17,
  },
  label: {
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 14,
    lineHeight: 19,
  },
  text: {
    fontFamily: "MacPawFixelDisplay_400",
    fontSize: 10,
    lineHeight: 12,
    color: "rgb(252, 252, 252)",
  },
});
