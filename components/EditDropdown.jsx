import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import IconEdit from "../images/icons/edit.svg";
import IconDelete from "../images/icons/delete.svg";
import EditWordModal from "./EditWordModal";

const EditDropdown = ({ onClose, data, id }) => {
  // console.log(id, data);

  const [isOpenEditWordModal, setOpenEditWordModal] = useState(false);

  const handleEdit = (id) => {
    setOpenEditWordModal(true);
  };

  const handleDelete = (id) => {
    onClose();
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleEdit(id)} style={styles.button}>
          <IconEdit />
          <Text style={styles.title}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.button}>
          <IconDelete />
          <Text style={styles.title}>Delete</Text>
        </TouchableOpacity>
      </View>
      {isOpenEditWordModal && (
        <EditWordModal onClose={onClose} data={data} id={id} />
      )}
    </>
  );
};

export default EditDropdown;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 2,
    top: 42,
    flexDirection: "column",
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: "rgb(255, 255, 255)",
    zIndex: 100,

    shadowColor: "rgb(18, 20, 23)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    elevation: 2,
  },
  button: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  title: {
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 14,
    lineHeight: 19,
    color: "rgb(18, 20, 23)",
  },
});
