import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Dashboard from "../components/Dashboard";

const DictionaryScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Dashboard />
      </View>
    </ScrollView>
  );
};

export default DictionaryScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",

    gap: 32,
    backgroundColor: "rgb(248, 248, 248)",
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 48,
    zIndex: -10,
  },
});
