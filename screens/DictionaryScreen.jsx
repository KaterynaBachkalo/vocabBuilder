import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Dashboard from "../components/Dashboard";

const DictionaryScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollcontainer}>
      <Dashboard />
      <Text>DictionaryScreen</Text>
    </ScrollView>
  );
};

export default DictionaryScreen;

const styles = StyleSheet.create({
  scrollcontainer: {
    alignItems: "center",

    backgroundColor: "rgb(248, 248, 248)",
  },
});
