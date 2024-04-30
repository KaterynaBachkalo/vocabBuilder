import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import IconVector from "../images/icons/vector.svg";
import IconSearch from "../images/icons/search.svg";
import DropDown from "./DropDown";
import RadioButtons from "./RadioButtons";

const windowWidth = Dimensions.get("window").width;

const Filters = () => {
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const handleSelectCategory = (selected) => {
    setSelectedCategory(selected);
    setOpenDropdown(false);
  };

  return (
    <View style={{ gap: 14, width: "100%" }}>
      <View style={{ position: "relative" }}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Find the word"
            />
          )}
          name="find"
          rules={{ required: true }}
          defaultValue=""
        />
        <TouchableOpacity
          style={styles.iconSearch}
          onPress={handleSubmit(onSubmit)}
        >
          <IconSearch />
        </TouchableOpacity>
      </View>

      <View style={{ position: "relative" }}>
        <View style={{ position: "relative" }}>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={selectedCategory}
                placeholder="Categories"
              />
            )}
            name="categories"
            rules={{ required: true }}
            defaultValue=""
          />
          <TouchableOpacity
            style={styles.iconVector}
            onPress={() => setOpenDropdown(!isOpenDropdown)}
          >
            <IconVector />
          </TouchableOpacity>
          {isOpenDropdown && (
            <DropDown
              onSelect={handleSelectCategory}
              widthContainer={windowWidth - 36}
              heightContainer={368}
              colorText="rgb(18, 20, 23)"
            />
          )}
        </View>
        {selectedCategory === "Verb" && (
          <View style={styles.radioButtons}>
            <RadioButtons
              color="rgb(133, 170, 159)"
              uncheckedColor="rgba(18, 20, 23, 0.2)"
              colorText="rgb(18, 20, 23)"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(18, 20, 23, 0.1)",
    borderRadius: 15,
    paddingHorizontal: 12,
  },
  focusedInput: {
    borderColor: "rgb(133, 170, 159)",
  },
  iconSearch: {
    position: "absolute",
    right: 19,
    top: "50%",
    transform: [{ translateY: -20 }],
    padding: 10,
  },
  iconVector: {
    position: "absolute",
    right: 24,
    top: "50%",
    transform: [{ translateY: -12 }],
    padding: 10,
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
  radioButtons: {
    position: "absolute",
    bottom: -35,
    left: 0,
  },
});
