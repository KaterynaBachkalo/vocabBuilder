import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Dashboard from "../components/Dashboard";
import WordsTable from "../components/WordsTable";
import WordsPagination from "../components/WordsPagination";

const DictionaryScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Dashboard />
        <WordsTable />
        <WordsPagination />
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
