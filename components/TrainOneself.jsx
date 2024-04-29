import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import IconArrowRight from "../images/icons/arrow-right.svg";
import { useNavigation } from "@react-navigation/native";

const TrainOneself = () => {
  const navigation = useNavigation();

  return (
    <View style={{ gap: 8, flexDirection: "row" }}>
      <Text>Train oneself</Text>
      <TouchableOpacity onPress={() => navigation.navigate("TrainingScreen")}>
        <IconArrowRight />
      </TouchableOpacity>
    </View>
  );
};

export default TrainOneself;
