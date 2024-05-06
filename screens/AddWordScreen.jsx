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
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import IconCross from "../images/icons/cross.svg";
import IconVectorWhite from "../images/icons/vector-white.svg";
import IconUkr from "../images/icons/ukr.svg";
import IconEng from "../images/icons/eng.svg";
import IconError from "../images/icons/error.svg";

import RadioButtons from "../components/RadioButtons";
import DropDown from "../components/DropDown";
import { createWord } from "../redux/words/operations";
import { Controller, useForm } from "react-hook-form";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddWordScreen = () => {
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const [radioValue, setRadioValue] = useState(false);
  const [inputUkrainianValue, setInputUkrainianValue] = useState("");
  const [inputEnglishValue, setInputEnglishValue] = useState("");
  const [visible, setVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Noun");
  const [focusedInput, setFocusedInput] = useState(null);

  const Schema = Yup.object().shape({
    ua: Yup.string().matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/,
      "Please enter valid value"
    ),

    en: Yup.string().matches(
      /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
      "Please enter valid value"
    ),
  });

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onClose = () => {
    setVisible(false);
    navigation.navigate("DictionaryScreen");
  };

  const handleSelectCategory = (selected) => {
    setSelectedCategory(selected);
    setOpenDropdown(false);
  };

  const handleAdd = (value) => {
    // Логіка для додавання
    if (selectedCategory === "Verb") {
      const data = {
        en: value.en,
        ua: value.ua,
        category: selectedCategory.toLowerCase(),
        isIrregular: radioValue ? true : false,
      };
      console.log("addWordScreen", data);
      dispatch(createWord(data));
    } else {
      const data = {
        en: value.en,
        ua: value.ua,
        category: selectedCategory.toLowerCase(),
      };
      console.log("addWordScreen", data);
      dispatch(createWord(data));
    }

    // Скидання значень після додавання
    // reset();
    setRadioValue(false);
    // Закриття поп-апа
    onClose();
  };

  const resetFields = () => {
    setInputUkrainianValue("");
    setInputEnglishValue("");
    setRadioValue(false);
    setSelectedCategory("Noun");
  };

  const handleCancel = () => {
    // resetFields();
    // clearErrors();
    reset();
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
            {/* Вибір частини мови */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={selectedCategory}
                />
              )}
              name="category"
              // rules={{ required: true }}
              defaultValue=""
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
              onRadioChange={() => setRadioValue()}
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

              {/* Ukrainian */}
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "ua" && styles.focusedInput,
                      errors.ua && styles.errorInput,
                    ]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={() => setFocusedInput(false)}
                    onFocus={() => setFocusedInput("ua")}
                    defaultValue=""
                  />
                )}
                name="ua"
                // rules={{ required: true }}
                defaultValue=""
              />
              {errors.ua && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <IconError />
                  <Text style={styles.errorMessage}>{errors.ua.message}</Text>
                </View>
              )}
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
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "en" && styles.focusedInput,
                      errors.en && styles.errorInput,
                    ]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={() => setFocusedInput(false)}
                    onFocus={() => setFocusedInput("en")}
                  />
                )}
                name="en"
                // rules={{ required: true }}
                defaultValue=""
              />
              {errors.en && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <IconError />
                  <Text style={styles.errorMessage}>{errors.en.message}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSubmit(handleAdd)}
            >
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
  errorMessage: {
    color: "#D80027",
    fontSize: 12,
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  errorInput: {
    borderColor: "#D80027",
  },
  focusedInput: {
    borderColor: "rgba(18, 20, 23, 0.2)",
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
