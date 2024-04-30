import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import IconOff from "../images/icons/icon-off.svg";
import IconOn from "../images/icons/icon-on.svg";
import IconError from "../images/icons/error.svg";
import { useDispatch } from "react-redux";
import { logInThunk } from "../redux/auth/operations";

const LoginForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [focusedInput, setFocusedInput] = useState(null);
  const [eyeOff, setEyeOff] = useState(true);

  const SignupIn = Yup.object().shape({
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SignupIn),
  });

  const onSubmit = (data) => {
    console.log(data);
    try {
      dispatch(logInThunk(data));
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <View style={{ gap: 32 }}>
      <View style={{ gap: 14 }}>
        <View style={{ position: "relative" }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "email" && styles.focusedInput,
                  errors.email && styles.errorInput,
                ]}
                onBlur={() => setFocusedInput(false)}
                onFocus={() => setFocusedInput("email")}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.email && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <IconError />
              <Text style={styles.errorMessage}>{errors.email.message}</Text>
            </View>
          )}
        </View>

        <View style={{ position: "relative" }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "password" && styles.focusedInput,
                  errors.password && styles.errorInput,
                ]}
                onBlur={() => setFocusedInput(false)}
                onFocus={() => setFocusedInput("password")}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                secureTextEntry={eyeOff ? true : false}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          {eyeOff ? (
            <TouchableOpacity
              onPress={() => setEyeOff(false)}
              style={styles.eye}
            >
              <IconOff />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setEyeOff(true)}
              style={styles.eye}
            >
              <IconOn />
            </TouchableOpacity>
          )}

          {errors.password && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                position: "absolute",
                bottom: -18,
              }}
            >
              <IconError />
              <Text style={styles.errorMessage}>{errors.password.message}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ gap: 16 }}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.buttonLogin}
        >
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.textRegister}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  buttonLogin: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "rgb(133, 170, 159)",
    padding: 16,
  },
  textLogin: {
    color: "#FCFCFC",
    fontFamily: "MacPawFixelDisplay_700",
    fontSize: 16,
    lineHeight: 24,
  },
  textRegister: {
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "MacPawFixelDisplay_700",
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: "underline",
  },
  eye: {
    position: "absolute",
    right: 18,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  errorMessage: {
    color: "#D80027",
    fontSize: 12,
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  errorInput: {
    borderColor: "#D80027",
  },
});
