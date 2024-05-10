import React from "react";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const ProgressBar = () => {
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
        fill={15}
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
