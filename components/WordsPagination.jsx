import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconNextPage from "../images/icons/nextPage.svg";
import IconPrevPage from "../images/icons/prevPage.svg";
import IconFirstPage from "../images/icons/firstPage.svg";
import IconLastPage from "../images/icons/lastPage.svg";

const WordsPagination = ({
  prevPage,
  nextPage,
  totalPages,
  currentPage,
  firstPage,
  lastPage,
}) => {
  return (
    <View style={styles.container}>
      {currentPage !== 1 && (
        <>
          <TouchableOpacity onPress={firstPage}>
            <IconFirstPage />
          </TouchableOpacity>
          <TouchableOpacity onPress={prevPage}>
            <IconPrevPage />
          </TouchableOpacity>
        </>
      )}

      {currentPage - 1 !== 0 && (
        <TouchableOpacity onPress={prevPage}>
          <Text style={styles.button}>{currentPage - 1}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity>
        <Text style={styles.buttonActive}>{currentPage}</Text>
      </TouchableOpacity>

      {currentPage + 1 <= totalPages && (
        <>
          <TouchableOpacity onPress={nextPage}>
            <Text style={styles.button}>{currentPage + 1}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={nextPage}>
            <IconNextPage />
          </TouchableOpacity>
        </>
      )}

      {currentPage !== totalPages && (
        <TouchableOpacity onPress={lastPage}>
          <IconLastPage />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WordsPagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonActive: {
    display: "flex",
    width: 32,
    height: 32,
    borderColor: "rgba(18, 20, 23, 0.1)",
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",

    paddingVertical: 10,

    fontFamily: "MacPawFixelDisplay_600",
    fontSize: 13,
    lineHeight: 13,

    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(133, 170, 159)",
  },
  button: {
    display: "flex",
    width: 32,
    height: 32,
    borderColor: "rgba(18, 20, 23, 0.1)",
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",

    paddingVertical: 10,

    fontFamily: "MacPawFixelDisplay_600",
    fontSize: 13,
    lineHeight: 13,

    color: "rgb(18, 20, 23)",
  },
});
