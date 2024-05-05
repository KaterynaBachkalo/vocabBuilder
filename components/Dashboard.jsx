import React, { useState } from "react";
import Filters from "./Filters";
import Statistics from "../components/Statistics";
import AddWordBtn from "../components/AddWordBtn";
import TrainOneself from "../components/TrainOneself";
import { View } from "react-native";
import WordsTable from "./WordsTable";
import { RefreshControl, ActivityIndicator } from "react-native";
import { fetchOwnWords } from "../redux/words/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../redux/words/selectors";

const Dashboard = () => {
  const [searchWord, setSearchWord] = useState("");

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSearch = (searchWord) => {
    setSearchWord(searchWord);
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
    // refreshControl={
    //   <RefreshControl
    //     refreshing={isLoading}
    //     onRefresh={dispatch(fetchOwnWords)}
    //   />
    // }
    >
      <Filters onSearch={handleSearch} />
      <View style={{ marginTop: 8, gap: 8 }}>
        <Statistics />
        <View style={{ flexDirection: "row", gap: 16 }}>
          <AddWordBtn />
          <TrainOneself />
        </View>
      </View>
      <WordsTable searchWord={searchWord} />
    </View>
  );
};

export default Dashboard;
