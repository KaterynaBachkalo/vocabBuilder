import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Dashboard from "../components/Dashboard";
import IconPlus from "../images/icons/plus.svg";
import IconArrowRight from "../images/icons/arrow-right.svg";

const DictionaryScreen = () => {
  return (
    <View style={styles.scrollcontainer}>
      <Dashboard />
      <View style={{ marginTop: 40, gap: 8, marginBottom: 32 }}>
        <Text>To study: 20</Text>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={{ gap: 8, flexDirection: "row" }}>
            <Text>Add word</Text>
            <TouchableOpacity>
              <IconPlus />
            </TouchableOpacity>
          </View>
          <View style={{ gap: 8, flexDirection: "row" }}>
            <Text>Train oneself</Text>
            <TouchableOpacity>
              <IconArrowRight />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
