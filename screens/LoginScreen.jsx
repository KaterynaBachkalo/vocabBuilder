import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button
        title="Don’t have an account? Register"
        onPress={() => navigation.navigate("Registration")}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
