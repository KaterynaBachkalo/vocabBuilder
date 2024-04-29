import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Dashboard from "../components/Dashboard";
import WordsTable from "../components/WordsTable";

const DictionaryScreen = () => {
  return (
    <View style={styles.scrollcontainer}>
      <Dashboard />
      <WordsTable />
    </View>
  );
};

export default DictionaryScreen;

const styles = StyleSheet.create({
  scrollcontainer: {
    position: "relative",

    backgroundColor: "rgb(248, 248, 248)",
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 48,
    zIndex: -10,
  },
});
