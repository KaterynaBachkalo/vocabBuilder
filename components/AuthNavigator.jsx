import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Logo from "../images/icons/logo.svg";
import { StyleSheet, Text, View } from "react-native";

const MainStack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: "",
            headerLeft: () => (
              <View style={styles.header}>
                <Logo />
                <Text style={styles.subtitle}>VocabBuilder</Text>
              </View>
            ),
            headerStyle: {
              height: 68,
              backgroundColor: "#F8F8F8",
            },
          }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "",
            headerLeft: () => (
              <View style={styles.header}>
                <Logo />
                <Text style={styles.subtitle}>VocabBuilder</Text>
              </View>
            ),
            headerStyle: {
              height: 68,
              backgroundColor: "#F8F8F8",
            },
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: "MacPawFixelDisplay_600",
    fontSize: 18,
    lineHeight: 24,
    color: "#121417",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingLeft: 6,
  },
});
