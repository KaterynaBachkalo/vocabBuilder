import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import emptyImg from "../images/empty.png";
import { useNavigation } from "@react-navigation/native";

const EmptyTraining = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.img}>
          <Image source={emptyImg} />
        </View>
        <Text style={styles.title}>
          You don't have a single word to learn right now.
        </Text>
        <Text style={styles.subtitle}>
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </Text>
      </View>

      <View style={styles.buttonsWrap}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddWordScreen")}
        >
          <Text style={styles.addTextBtn}>Add word</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DictionaryScreen")}
        >
          <Text style={styles.cancelTextBtn}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmptyTraining;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: "space-between",
    flex: 1,
  },
  img: {
    paddingTop: 75,
    paddingBottom: 32,
    alignItems: "center",
  },
  title: {
    color: "rgb(18, 20, 23)",
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  subtitle: {
    color: "rgb(18, 20, 23)",
    fontFamily: "MacPawFixelDisplay_400",
    fontSize: 14,
    lineHeight: 19,
  },
  buttonsWrap: {
    alignItems: "center",
    gap: 8,
  },
  button: {
    padding: 16,
    width: "100%",
    backgroundColor: "rgb(133, 170, 159)",
    alignItems: "center",
    borderRadius: 30,
  },
  addTextBtn: {
    color: "rgb(252, 252, 252)",
    fontFamily: "MacPawFixelDisplay_700",
    fontSize: 16,
    lineHeight: 24,
  },
  cancelTextBtn: {
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "MacPawFixelDisplay_700",
    fontSize: 16,
    lineHeight: 24,
  },
});
