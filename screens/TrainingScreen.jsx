import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProgressBar from "../components/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAnswers,
  selectError,
  selectTasks,
} from "../redux/words/selectors";
import { fetchTasks, postAnswers } from "../redux/words/operations";
import IconArrowRight from "../images/icons/arrowRight.svg";
import IconUkr from "../images/icons/ukr.svg";
import IconEng from "../images/icons/eng.svg";
import IconError from "../images/icons/error.svg";

import EmptyTraining from "../components/EmptyTraining";
import { useNavigation } from "@react-navigation/native";
import ModalError from "../components/ModalError";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

const TrainingScreen = () => {
  const [text, setText] = useState("");
  const [answerArr, setAnswerArr] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Індекс поточної картки
  const [isError, setIsError] = useState(false);
  const { tasks } = useSelector(selectTasks);
  const errorMessage = useSelector(selectError);
  const answer = useSelector(selectAnswers);

  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const onNextCard = () => {
    if (tasks[currentCardIndex].ua) {
      const answer = {
        _id: tasks[currentCardIndex]._id,
        en: text ? text.toLowerCase() : null,
        ua: tasks[currentCardIndex].ua.toLowerCase(),
        task: tasks[currentCardIndex].task,
      };

      answerArr?.push(answer);
    } else {
      const answer = {
        _id: tasks[currentCardIndex]._id,
        en: tasks[currentCardIndex].en.toLowerCase(),
        ua: text ? text.toLowerCase() : null,
        task: tasks[currentCardIndex].task,
      };
      answerArr?.push(answer);
    }
    setText("");

    if (currentCardIndex < tasks.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const onSave = () => {
    dispatch(postAnswers(answerArr));
    console.log("answerArr", answerArr);
    if (answerArr.length !== 0) {
      navigation.navigate("WellDoneScreen");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      // setIsError(true);
      alert("Something went wrong, please try later");
    }
  }, [errorMessage]);

  if (!tasks || tasks.length === 0) {
    return <EmptyTraining />;
  }

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <ProgressBar />
      <View
        style={{
          padding: 22,
          backgroundColor: "rgb(252, 252, 252)",
          borderBottomWidth: 1,
          borderBottomColor: "rgb(219, 219, 219)",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Введіть переклад"
              value={text}
              onChangeText={(text) => setText(text)}
              defaultValue=""
            />
          )}
          name="textInput"
          defaultValue=""
        />
        {errors.textInput && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <IconError />
            <Text style={styles.errorMessage}>{errors.textInput.message}</Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {tasks?.length - 1 !== currentCardIndex && (
            <TouchableOpacity onPress={onNextCard} style={styles.nextLabel}>
              <Text style={styles.nextBtn}>Next</Text>
              <IconArrowRight />
            </TouchableOpacity>
          )}

          {tasks[currentCardIndex]?.task === "ua" ? (
            <View
              key={`${tasks[currentCardIndex]._id}-ua`}
              style={styles.langLabel}
            >
              <IconUkr />
              <Text style={styles.textlang}>Ukrainian</Text>
            </View>
          ) : (
            <View
              key={`${tasks[currentCardIndex]._id}-en`}
              style={styles.langLabel}
            >
              <IconEng />
              <Text style={styles.textlang}>English</Text>
            </View>
          )}
        </View>
      </View>

      <View
        style={{
          padding: 22,
          backgroundColor: "rgb(252, 252, 252)",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        {tasks[currentCardIndex]?.task === "ua" && (
          <View
            key={`${tasks[currentCardIndex]._id}-en`}
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
          >
            <Text>{tasks[currentCardIndex].en}</Text>
          </View>
        )}
        {tasks[currentCardIndex]?.task === "ua" && (
          <View
            key={`${tasks[currentCardIndex]._id}-en-label`}
            style={styles.langLabel}
          >
            <IconEng />
            <Text style={styles.textlang}>English</Text>
          </View>
        )}
        {tasks[currentCardIndex]?.task !== "ua" && (
          <View
            key={`${tasks[currentCardIndex]._id}-ua`}
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
          >
            <Text>{tasks[currentCardIndex].ua}</Text>
          </View>
        )}
        {tasks[currentCardIndex]?.task !== "ua" && (
          <View
            key={`${tasks[currentCardIndex]._id}-ua-label`}
            style={styles.langLabel}
          >
            <IconUkr />
            <Text style={styles.textlang}>Ukrainian</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonsWrap}>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.addTextBtn}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DictionaryScreen")}
        >
          <Text style={styles.cancelTextBtn}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {/* {isError && (
        <ModalError
          text="Something went wrong, please try later"
          isError={true}
        />
      )} */}
    </View>
  );
};

export default TrainingScreen;

const styles = StyleSheet.create({
  nextBtn: {
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 16,
    lineHeight: 24,
  },
  textlang: {
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 14,
    lineHeight: 19,
  },
  nextLabel: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginTop: 103,
  },
  langLabel: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginTop: 103,
    marginLeft: "auto",
  },
  buttonsWrap: {
    marginTop: "auto",
    alignItems: "center",
    gap: 8,
  },
  button: {
    padding: 16,
    width: "100%",
    backgroundColor: "rgb(133, 170, 159)",
    alignItems: "center",
    borderRadius: 30,
  },
  addTextBtn: {
    color: "rgb(252, 252, 252)",
    fontFamily: "MacPawFixelDisplay_700",
    fontSize: 16,
    lineHeight: 24,
  },
  cancelTextBtn: {
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "MacPawFixelDisplay_700",
    fontSize: 16,
    lineHeight: 24,
  },
  errorMessage: {
    color: "#D80027",
    fontSize: 12,
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
});
