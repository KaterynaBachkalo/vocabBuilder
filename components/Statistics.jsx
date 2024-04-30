import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "../redux/words/operations";
import { selectStatisticNumber } from "../redux/words/selectors";

const Statistics = () => {
  const dispatch = useDispatch();

  const quantity = useSelector(selectStatisticNumber);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>To study:</Text>
      <Text style={styles.number}>{quantity?.totalCount}</Text>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 8,
    alignItems: "baseline",
  },
  title: {
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 14,
    lineHeight: 19,
    color: "rgba(18, 20, 23, 0.5)",
  },
  number: {
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 20,
    lineHeight: 28,
    color: "rgb(18, 20, 23)",
  },
});
