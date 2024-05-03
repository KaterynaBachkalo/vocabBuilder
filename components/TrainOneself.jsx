import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconArrowRight from "../images/icons/arrowRight.svg";
import { useNavigation } from "@react-navigation/native";

const TrainOneself = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Train oneself</Text>
      <TouchableOpacity onPress={() => navigation.navigate("TrainingScreen")}>
        <IconArrowRight />
      </TouchableOpacity>
    </View>
  );
};

export default TrainOneself;

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
