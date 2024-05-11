import React, { useState } from "react";
import {
  Modal,
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import book from "../images/open orange book floating.png";
import IconCross from "../images/icons/cross.svg";
import { useSelector } from "react-redux";
import { selectAnswers } from "../redux/words/selectors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WellDoneScreen = () => {
  const [visible, setVisible] = useState(true);

  const navigation = useNavigation();

  const answerArr = useSelector(selectAnswers);
  const answer = answerArr.flat();

  const correct = [];
  const mistake = [];

  answer.forEach((cor) => {
    // Перевіряємо, чи вже є слово з таким же _id у масивах correct і mistake
    const isDuplicateInCorrect = correct.some((word) => word._id === cor._id);
    const isDuplicateInMistake = mistake.some((word) => word._id === cor._id);

    if (cor.isDone) {
      // Якщо isDone дорівнює true, додаємо слово до correct,
      // якщо його ще немає в масиві correct
      if (!isDuplicateInCorrect && cor.en !== null && cor.ua !== null) {
        correct.push(cor);
      }
    } else {
      // Якщо isDone дорівнює false, додаємо слово до mistake,
      // якщо його ще немає в масиві mistake
      if (!isDuplicateInMistake && cor.en !== null && cor.ua !== null) {
        mistake.push(cor);
      }
    }
  });

  const onClose = () => {
    setVisible(false);
    navigation.navigate("TrainingScreen");
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
          <Image source={book} style={styles.book} />
          <TouchableOpacity
            onPress={onClose}
            style={{ alignItems: "flex-end", marginBottom: 8 }}
          >
            <IconCross />
          </TouchableOpacity>
          <Text style={styles.title}>Well done</Text>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column", marginRight: 32 }}>
              <Text style={styles.subtitle}>Сorrect answers:</Text>
              {correct.map((cor) => (
                <View style={{ gap: 4 }}>
                  <Text key={cor._id} style={styles.text}>
                    {cor.task === "en"
                      ? cor.en
                      : cor.task === "ua"
                      ? cor.ua
                      : null}
                  </Text>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: "column" }}>
              <Text style={styles.subtitle}>Mistakes:</Text>
              {mistake.map((cor) => (
                <View style={{ gap: 4 }}>
                  <Text key={cor._id} style={styles.text}>
                    {cor.task === "en"
                      ? cor.en
                      : cor.task === "ua"
                      ? cor.ua
                      : null}
                  </Text>
                </View>
              ))}
            </View>
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
    paddingBottom: 48,
    borderRadius: 15,
    width: windowWidth - 32,
    minHeight: 459,
  },
  title: {
    fontFamily: "MacPawFixelDisplay_600",
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 32,
    color: "rgb(252, 252, 252)",
  },
  subtitle: {
    fontFamily: "MacPawFixelDisplay_400",
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 8,
    color: "rgba(252, 252, 252, 0.5)",
  },
  text: {
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 16,
    lineHeight: 24,
    color: "rgb(252, 252, 252)",
  },
  book: {
    position: "absolute",
    right: 0,
    bottom: 44,
  },
});
