import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";

import { useDispatch } from "react-redux";
import { deleteWord } from "../redux/words/operations";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function DeleteWordModal({ onClose, id }) {
  const [isModalVisible, setModalVisible] = useState(true);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    try {
      dispatch(deleteWord(id));

      // Закриття поп-апа
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <View style={{ gap: 16, marginVertical: 32 }}>
              <Text style={styles.title}>
                Do you really want to delete this word?
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleDelete(id)}
              >
                <Text style={{ textAlign: "center" }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={{ textAlign: "center" }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default DeleteWordModal;

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
    textAlign: "center",
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
