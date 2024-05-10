import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable } from "react-native";

const ModalError = ({ text, isError }) => {
  const [visible, setVisible] = useState(isError);

  useEffect(() => {
    if (isError) {
      setVisible(isError);
    }
  }, [isError]);

  const closeModal = () => {
    setVisible(!isError);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text>{text}</Text>
            <Pressable style={{ marginTop: 20 }} onPress={closeModal}>
              <Text style={{ color: "blue" }}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalError;
