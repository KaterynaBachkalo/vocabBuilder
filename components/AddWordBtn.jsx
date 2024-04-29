import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import IconPlus from "../images/icons/plus.svg";
import { useNavigation } from "@react-navigation/native";

const AddWordBtn = () => {
  const navigation = useNavigation();

  return (
    <View style={{ gap: 8, flexDirection: "row" }}>
      <Text>Add word</Text>
      <TouchableOpacity onPress={() => navigation.navigate("AddWordScreen")}>
        <IconPlus />
      </TouchableOpacity>
    </View>
  );
};

export default AddWordBtn;
