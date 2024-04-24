import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import DictionaryScreen from "../screens/DictionaryScreen";
import AddWordScreen from "../screens/AddWordScreen";
import RecommendScreen from "../screens/RecommendScreen";
import TrainingScreen from "../screens/TrainingScreen";
import WellDoneScreen from "../screens/WellDoneScreen";

const MainStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Dictionary screen"
          component={DictionaryScreen}
          options={{
            title: "",
            headerStyle: {
              height: 70,
            },
          }}
        />
        <MainStack.Screen
          name="AddWord screen"
          component={AddWordScreen}
          options={{
            title: "",
            headerStyle: {
              height: 70,
            },
          }}
        />
        <MainStack.Screen
          name="Recommend screen"
          component={RecommendScreen}
          options={{
            title: "",
            headerStyle: {
              height: 70,
            },
          }}
        />
        <MainStack.Screen
          name="Training screen"
          component={TrainingScreen}
          options={{
            title: "",
            headerStyle: {
              height: 70,
            },
          }}
        />
        <MainStack.Screen
          name="WellDone screen"
          component={WellDoneScreen}
          options={{
            title: "",
            headerStyle: {
              height: 70,
            },
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;
