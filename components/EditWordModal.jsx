import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import IconUkr from "../images/icons/ukr.svg";
import IconEng from "../images/icons/eng.svg";
import { useDispatch } from "react-redux";
import { editWord, fetchAllWords } from "../redux/words/operations";
import { vocabBuilderInstance } from "../redux/auth/operations";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function EditWordModal({ onClose, data, id }) {
  console.log("data", data, id);
  const [isModalVisible, setModalVisible] = useState(true);
  const [inputUkrainianValue, setInputUkrainianValue] = useState("");
  const [inputEnglishValue, setInputEnglishValue] = useState("");

  const dispatch = useDispatch();

  const setUkrWordIntoInput = () => {
    setInputUkrainianValue(data.ua);
  };

  const setEngWordIntoInput = () => {
    setInputEnglishValue(data.en);
  };

  const reset = () => {
    setInputUkrainianValue("");
    setInputEnglishValue("");
  };

  useEffect(() => {
    setUkrWordIntoInput();
    setEngWordIntoInput();
  }, []);

  const handleSave = () => {
    const newData = {
      en: inputEnglishValue,
      ua: inputUkrainianValue,
      category: data.category,
      isIrregular: data.isIrregular,
    };
    console.log("newData", newData);
    const id = data._id;
    dispatch(editWord(id, newData));
    // Скидання значень після додавання
    reset();
    // Закриття поп-апа
    onClose();
  };

  const handleCancel = () => {
    reset();

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
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <IconUkr />
                  <Text style={styles.label}>Ukrainian</Text>
                </View>
                {/* Ukrainian */}
                <TextInput
                  style={styles.input}
                  value={inputUkrainianValue}
                  onChangeText={setInputUkrainianValue}
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    marginBottom: 8,
                    alignItems: "center",
                  }}
                >
                  <IconEng />
                  <Text style={styles.label}>English</Text>
                </View>

                {/* English */}
                <TextInput
                  style={styles.input}
                  value={inputEnglishValue}
                  onChangeText={setInputEnglishValue}
                />
              </View>
            </View>
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
    </View>
  );
}

export default EditWordModal;

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
  input: {
    height: 48,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgb(209, 213, 219)",
    borderRadius: 15,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 8,

    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 16,
    lineHeight: 24,
    color: "rgb(252, 252, 252)",
  },

  label: {
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 14,
    lineHeight: 19,
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
