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

import IconCross from "../images/icons/cross.svg";
import IconVectorWhite from "../images/icons/vector-white.svg";
import IconUkr from "../images/icons/ukr.svg";
import IconEng from "../images/icons/eng.svg";
import RadioButtons from "../components/RadioButtons";
import DropDown from "../components/DropDown";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddWordScreen = () => {
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [radioValue, setRadioValue] = useState("regular");
  const [textInputValue, setTextInputValue] = useState("");
  const [visible, setVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(false);

  const navigation = useNavigation();

  const onClose = () => {
    setVisible(false);
    navigation.navigate("DictionaryScreen");
  };

  const handleSelectCategory = (selected) => {
    setSelectedCategory(selected);
    setOpenDropdown(false);
  };

  const handleAdd = () => {
    // Логіка для додавання
    console.log("Added:", inputValue, radioValue, textInputValue);
    // Скидання значень після додавання
    setInputValue("");
    setRadioValue("");
    setTextInputValue("");
    // Закриття поп-апа
    onClose();
  };

  const handleCancel = () => {
    // Скидання значень при скасуванні
    setInputValue("");
    setRadioValue("");
    setTextInputValue("");
    // Закриття поп-апа
    onClose();
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
          <Text style={styles.title}>Add word</Text>
          <Text style={styles.subtitle}>
            Adding a new word to the dictionary is an important step in
            enriching the language base and expanding the vocabulary.
          </Text>

          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              onChangeText={setTextInputValue}
              value={selectedCategory}
              defaultValue="Noun"
            />
            <TouchableOpacity
              style={styles.iconVector}
              onPress={() => setOpenDropdown(!isOpenDropdown)}
            >
              <IconVectorWhite />
            </TouchableOpacity>
            {isOpenDropdown && (
              <DropDown
                onSelect={handleSelectCategory}
                widthContainer={windowWidth - 64}
                heightContainer={240}
                colorText="rgba(18, 20, 23, 0.5)"
              />
            )}
          </View>

          {selectedCategory === "Verb" && (
            <RadioButtons
              color="rgb(252, 252, 252)"
              uncheckedColor="rgb(252, 252, 252)"
              colorText="rgb(252, 252, 252)"
            />
          )}

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
              <TextInput
                style={styles.input}
                value={textInputValue}
                onChangeText={setTextInputValue}
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
              <TextInput
                style={styles.input}
                value={textInputValue}
                onChangeText={setTextInputValue}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={{ textAlign: "center" }}>Add</Text>
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

export default AddWordScreen;

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
  iconVector: {
    position: "absolute",
    right: 24,
    top: "50%",
    transform: [{ translateY: -18 }],
    padding: 10,
  },
  radioGroup: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 33,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#eee",
  },
  radioLabel: {
    fontFamily: "MacPawFixelDisplay_400",
    fontSize: 14,
    lineHeight: 17,
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
  addButton: {
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
