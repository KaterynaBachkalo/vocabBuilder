import React, { useState } from "react";
import Filters from "./Filters";
import Statistics from "../components/Statistics";
import AddWordBtn from "../components/AddWordBtn";
import TrainOneself from "../components/TrainOneself";
import { View } from "react-native";
import WordsTable from "./WordsTable";

const Dashboard = () => {
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = (searchWord) => {
    console.log("Search word:", searchWord);
    setSearchWord(searchWord); // Оновлення локального стану зі значенням пошукового слова
  };

  return (
    <>
      <Filters onSearch={handleSearch} />
      <View style={{ marginTop: 8, gap: 8 }}>
        <Statistics />
        <View style={{ flexDirection: "row", gap: 16 }}>
          <AddWordBtn />
          <TrainOneself />
        </View>
      </View>
      <WordsTable searchWord={searchWord} />
    </>
  );
};

export default Dashboard;
