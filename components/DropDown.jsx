import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchWordsCategories } from "../redux/words/operations";
import { selectWords } from "../redux/words/selectors";

const windowWidth = Dimensions.get("window").width;

const DropDown = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectWords);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchWordsCategories());
  }, []);

  return (
    <View style={styles.container}>
      {categories.lenght !== 0 &&
        categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.text}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: windowWidth - 36,
    top: 58,

    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
    zIndex: 100,
    shadowColor: "rgb(18, 20, 23)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    elevation: 2,
  },
  text: {
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 16,
    lineHeight: 24,
  },
});
