import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginForm = () => {
  const navigation = useNavigation();
  const [focusedInput, setFocusedInput] = useState(null);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please enter valid email")
      .required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
        "Password must have 6 letters and the last digit"
      )
      .required("Required"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={SignupSchema}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => (
        <View style={{ gap: 32 }}>
          <View style={{ gap: 14 }}>
            <TextInput
              name="email"
              style={[
                styles.input,
                focusedInput === "email" && styles.focusedInput,
              ]}
              onChangeText={handleChange("email")}
              onBlur={() => setFocusedInput(false)}
              onFocus={() => setFocusedInput("email")}
              value={values.email}
              placeholder="Email"
            />
            {touched.email && errors.email && <Text>{errors.email}</Text>}
            <TextInput
              name="password"
              style={[
                styles.input,
                focusedInput === "password" && styles.focusedInput,
              ]}
              onChangeText={handleChange("password")}
              onBlur={() => setFocusedInput(false)}
              onFocus={() => setFocusedInput("password")}
              value={values.password}
              secureTextEntry
              placeholder="Password"
            />
            {touched.password && errors.password && (
              <Text>{errors.password}</Text>
            )}
          </View>

          <View style={{ gap: 16 }}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.buttonRegister}
            >
              <Text style={styles.textRegister}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text style={styles.textLogin}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  input: {
    height: 56,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(18, 20, 23, 0.1)",
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  focusedInput: {
    borderColor: "rgb(133, 170, 159)",
  },
  buttonRegister: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "rgb(133, 170, 159)",
    padding: 16,
  },
  textRegister: {
    color: "#FCFCFC",
    fontFamily: "MacPawFixelDisplay_700",
    fontSize: 16,
    lineHeight: 24,
  },
  textLogin: {
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "MacPawFixelDisplay_700",
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: "underline",
  },
});
