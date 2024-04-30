import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchWordsCategories } from "../redux/words/operations";
import { selectWords } from "../redux/words/selectors";

const DropDown = ({ onSelect, widthContainer, heightContainer, colorText }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectWords);

  const categoriesUpperCase = categories.map(
    (i) => i.charAt(0).toUpperCase() + i.slice(1)
  );

  const handleSelect = (category) => {
    onSelect(category);
  };

  useEffect(() => {
    dispatch(fetchWordsCategories());
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={[
        styles.container,
        {
          width: widthContainer,
          height: heightContainer,
        },
      ]}
    >
      <View style={styles.wrap}>
        {categories.lenght !== 0 &&
          categoriesUpperCase.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handleSelect(category)}
            >
              <Text style={[styles.text, { color: colorText }]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 58,

    backgroundColor: "#ffffff",
    borderRadius: 15,

    zIndex: 100,
    shadowColor: "rgb(18, 20, 23)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    elevation: 2,
  },
  wrap: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
  },
  text: {
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 16,
    lineHeight: 24,
  },
});
