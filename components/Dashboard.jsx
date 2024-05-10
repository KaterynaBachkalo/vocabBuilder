import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import Statistics from "../components/Statistics";
import AddWordBtn from "../components/AddWordBtn";
import TrainOneself from "../components/TrainOneself";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import WordsTable from "./WordsTable";
import { useRoute } from "@react-navigation/native";
import { Text } from "react-native";
import IconArrowRight from "../images/icons/arrowRight.svg";
import EditDropdown from "./EditDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPage,
  selectIsLoading,
  selectWords,
} from "../redux/words/selectors";

const Dashboard = () => {
  const route = useRoute();

  const [searchWord, setSearchWord] = useState("");

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSearch = (searchWord) => {
    setSearchWord(searchWord);
  };
  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

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
      <View style={{ marginTop: 8, gap: 8, marginBottom: 32 }}>
        <Statistics />
        <View style={{ flexDirection: "row", gap: 16 }}>
          {route.name === "DictionaryScreen" && <AddWordBtn />}
          <TrainOneself />
        </View>
      </View>
      <WordsTable
        searchWord={searchWord}
        widthArr={
          route.name === "DictionaryScreen"
            ? [82, 116, 95, 50]
            : [90, 116, 99, 38]
        }
        title={route.name === "DictionaryScreen" ? "Progress" : "Category"}
        routeName={route.name}
      />
    </View>
  );
};
export default Dashboard;
