import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import IconUserMenu from "../images/icons/userDefaultMenu.svg";
import IconCross from "../images/icons/cross.svg";

const Header = ({ onClose }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Text>Name</Text>
        <IconUserMenu />
      </View>
      <TouchableOpacity onPress={() => onClose(false)}>
        <IconCross style={styles.cross} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  cross: {
    alignSelf: "flex-end",
  },
});