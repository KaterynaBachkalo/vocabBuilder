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
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";

import IconUkr from "../images/icons/ukr.svg";
import IconEng from "../images/icons/eng.svg";
import IconError from "../images/icons/error.svg";

import { useDispatch } from "react-redux";
import { editWord } from "../redux/words/operations";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function EditWordModal({ onClose, data, id, rowNumber }) {
  const [isModalVisible, setModalVisible] = useState(true);
  const [inputUkrainianValue, setInputUkrainianValue] = useState("");
  const [inputEnglishValue, setInputEnglishValue] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const dispatch = useDispatch();

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
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const setUkrWordIntoInput = () => {
    setInputUkrainianValue(data.ua);
  };

  const setEngWordIntoInput = () => {
    setInputEnglishValue(data.en);
  };

  useEffect(() => {
    setUkrWordIntoInput();
    setEngWordIntoInput();
  }, []);

  const handleSave = () => {
    try {
      console.log("category", data.category);

      if (data.category === "verb") {
        const newData = {
          id,
          en: inputEnglishValue,
          ua: inputUkrainianValue,
          category: data.category.toLowerCase(),
          isIrregular: data.isIrregular,
        };
        dispatch(editWord(newData));
      } else {
        const newData = {
          id,
          en: inputEnglishValue,
          ua: inputUkrainianValue,
          category: data.category.toLowerCase(),
        };
        dispatch(editWord(newData));
      }

      // Скидання значень після додавання
      reset();
      // Закриття поп-апа
      onClose();
    } catch {
      console.log(errors);
    }
  };

  const handleCancel = () => {
    reset();

    onClose();
  };

  const handleChangeUkrText = (text) => {
    setInputUkrainianValue(text);
  };

  const handleChangeEngText = (text) => {
    setInputEnglishValue(text);
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
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        styles.input,
                        focusedInput === "ua" && styles.focusedInput,
                        errors.ua && styles.errorInput,
                      ]}
                      value={inputUkrainianValue}
                      onChangeText={handleChangeUkrText}
                      onBlur={() => setFocusedInput(false)}
                      onFocus={() => setFocusedInput("ua")}
                    />
                  )}
                  name="ua"
                  // rules={{ required: true }}
                  defaultValue={data.ua}
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
                      value={inputEnglishValue}
                      onChangeText={handleChangeEngText}
                      onBlur={() => setFocusedInput(false)}
                      onFocus={() => setFocusedInput("en")}
                    />
                  )}
                  name="en"
                  // rules={{ required: true }}
                  defaultValue={data.en}
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
                style={styles.saveButton}
                onPress={handleSubmit(handleSave)}
              >
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
