import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import IconUserMenu from "../images/icons/userDefaultMenu.svg";
import IconCross from "../images/icons/cross.svg";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../redux/auth/selectors";

const Header = ({ onClose }) => {
  const currentUser = useSelector(selectAuthUser);

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
        <Text style={styles.name}>{currentUser?.name}</Text>
        <IconUserMenu />
      </View>
      <TouchableOpacity onPress={() => onClose()}>
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
  name: {
    color: "rgb(252, 252, 252)",
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 16,
    lineHeight: 22,
  },
});
