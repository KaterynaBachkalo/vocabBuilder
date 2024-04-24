// Formik x React Native example
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const RegisterForm = () => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{ gap: 32 }}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={{ gap: 14 }}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  placeholder="Name"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                  placeholder="Password"
                />
              </View>
            </KeyboardAvoidingView>
            <View style={{ gap: 16 }}>
              <View style={{ backgroundColor: "#85AA9F" }}>
                <Button onPress={handleSubmit} title="Register" />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </TouchableWithoutFeedback>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  input: {
    height: 56,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(18, 20, 23, 0.1)",
    borderRadius: 15,
    paddingHorizontal: 16,
  },
});
