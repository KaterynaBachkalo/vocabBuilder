import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
            headerStyle: {
              height: 50,
            },
          }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "",
            headerStyle: {
              height: 50,
            },
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
