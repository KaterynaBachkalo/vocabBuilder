import React from "react";
import Filters from "./Filters";
import Statistics from "../components/Statistics";
import AddWordBtn from "../components/AddWordBtn";
import TrainOneself from "../components/TrainOneself";
import { View } from "react-native";

const Dashboard = () => {
  return (
    <>
      <Filters />
      <View style={{ marginTop: 40, gap: 8, marginBottom: 32 }}>
        <Statistics />
        <View style={{ flexDirection: "row", gap: 16 }}>
          <AddWordBtn />
          <TrainOneself />
        </View>
      </View>
    </>
  );
};

export default Dashboard;
