import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import IconCross from "../images/icons/cross.svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WellDoneScreen = () => {
  const [visible, setVisible] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onClose = () => {
    setVisible(false);
    navigation.navigate("TrainingScreen");
  };

  const handleSave = () => {
    console.log("Saved");
  };

  const handleCancel = () => {
    console.log("Cancel");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.popup}>
          <TouchableOpacity
            onPress={onClose}
            style={{ alignItems: "flex-end", marginBottom: 8 }}
          >
            <IconCross />
          </TouchableOpacity>
          <Text style={styles.title}>Well done</Text>
          <Text style={styles.subtitle}></Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={{ textAlign: "center" }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={{ textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WellDoneScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(18, 20, 23, 0.2)",
    padding: 16,
    height: windowHeight - 32,
  },
  popup: {
    backgroundColor: "rgb(133, 170, 159)",
    padding: 16,
    borderRadius: 15,
    width: windowWidth - 32,
  },
  title: {
    fontFamily: "MacPawFixelDisplay_600",
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 16,
    color: "rgb(252, 252, 252)",
  },
  subtitle: {
    fontFamily: "MacPawFixelDisplay_400",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: "rgb(252, 252, 252)",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "rgb(252, 252, 252)",
    width: windowWidth / 2 - 36,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 8,
  },
  cancelButton: {
    borderColor: "rgba(252, 252, 252, 0.4)",
    borderWidth: 1,
    width: windowWidth / 2 - 36,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 30,
  },
});
