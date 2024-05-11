import React from "react";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSelector } from "react-redux";
import { selectAnswers } from "../redux/words/selectors";

const ProgressBar = ({ tasksNumber }) => {
  // console.log("tasksNumber", tasksNumber);
  const answerArr = useSelector(selectAnswers);
  const answer = answerArr.flat();

  const correct = answer.filter((cor) => cor.isDone === true);
  // console.log("correct", correct);
  // console.log("correctNum", correct.length);

  const correctAnswers = correct.length;

  const progress = Math.round((correctAnswers / tasksNumber) * 100);
  // console.log("progress", progress);

  return (
    <View
      style={{
        paddingTop: 8,
        paddingBottom: 8,
        marginLeft: "auto",
      }}
    >
      <AnimatedCircularProgress
        size={44}
        width={4}
        fill={progress}
        tintColor="rgb(133, 170, 159)"
        backgroundColor="rgb(255, 255, 255)"
        padding={0}
        rotation={0}
      >
        {(fill) => <Text>{fill}</Text>}
      </AnimatedCircularProgress>
    </View>
  );
};

export default ProgressBar;
