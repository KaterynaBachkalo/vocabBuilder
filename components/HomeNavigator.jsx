import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import DictionaryScreen from "../screens/DictionaryScreen";
import AddWordScreen from "../screens/AddWordScreen";
import RecommendScreen from "../screens/RecommendScreen";
import TrainingScreen from "../screens/TrainingScreen";
import WellDoneScreen from "../screens/WellDoneScreen";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Menu from "../components/Menu";

import Logo from "../images/icons/logo.svg";
import IconUser from "../images/icons/userDefault.svg";
import IconBurgerMenu from "../images/icons/burger.svg";

import imageMenu from "../images/illustration.png";
import Header from "./Header";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../redux/auth/selectors";

const MainStack = createStackNavigator();
const windowHeight = Dimensions.get("window").height;

const HomeNavigator = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);

  const currentUser = useSelector(selectAuthUser);

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="DictionaryScreen"
          component={DictionaryScreen}
          options={{
            title: "",
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Logo />
                <Text style={styles.subtitle}>VocabBuilder</Text>
              </View>
            ),
            headerRight: () => (
              <View style={styles.headerRight}>
                <Text style={styles.name}>{currentUser.name}</Text>
                <IconUser />
                {!isOpenMenu ? (
                  <TouchableOpacity onPress={() => setOpenMenu(true)}>
                    <IconBurgerMenu />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.menu}>
                    <View style={{ padding: 16, gap: 100 }}>
                      <Header onClose={setOpenMenu} />
                      <Menu />
                    </View>
                    <Image source={imageMenu} />
                  </View>
                )}
              </View>
            ),
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <MainStack.Screen
          name="AddWordScreen"
          component={AddWordScreen}
          options={{
            title: "",
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Logo />
                <Text style={styles.subtitle}>VocabBuilder</Text>
              </View>
            ),
            headerRight: () => (
              <View style={styles.headerRight}>
                <Text>Name</Text>
                <IconUser />
                {!isOpenMenu ? (
                  <TouchableOpacity onPress={() => setOpenMenu(true)}>
                    <IconBurgerMenu />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.menu}>
                    <View style={{ padding: 16, gap: 100 }}>
                      <Header onClose={setOpenMenu} />
                      <Menu />
                    </View>
                    <Image source={imageMenu} />
                  </View>
                )}
              </View>
            ),
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <MainStack.Screen
          name="RecommendScreen"
          component={RecommendScreen}
          options={{
            title: "",
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Logo />
                <Text style={styles.subtitle}>VocabBuilder</Text>
              </View>
            ),
            headerRight: () => (
              <View style={styles.headerRight}>
                <Text>Name</Text>
                <IconUser />
                {!isOpenMenu ? (
                  <TouchableOpacity onPress={() => setOpenMenu(true)}>
                    <IconBurgerMenu />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.menu}>
                    <View style={{ padding: 16, gap: 100 }}>
                      <Header onClose={setOpenMenu} />
                      <Menu />
                    </View>
                    <Image source={imageMenu} />
                  </View>
                )}
              </View>
            ),
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <MainStack.Screen
          name="TrainingScreen"
          component={TrainingScreen}
          options={{
            title: "",
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Logo />
                <Text style={styles.subtitle}>VocabBuilder</Text>
              </View>
            ),
            headerRight: () => (
              <View style={styles.headerRight}>
                <Text>Name</Text>
                <IconUser />
                {!isOpenMenu ? (
                  <TouchableOpacity onPress={() => setOpenMenu(true)}>
                    <IconBurgerMenu />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.menu}>
                    <View style={{ padding: 16, gap: 100 }}>
                      <Header onClose={setOpenMenu} />
                      <Menu />
                    </View>
                    <Image source={imageMenu} />
                  </View>
                )}
              </View>
            ),
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <MainStack.Screen
          name="WellDoneScreen"
          component={WellDoneScreen}
          options={{
            title: "",
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Logo />
                <Text style={styles.subtitle}>VocabBuilder</Text>
              </View>
            ),
            headerRight: () => (
              <View style={styles.headerRight}>
                <Text>Name</Text>
                <IconUser />
                {!isOpenMenu ? (
                  <TouchableOpacity onPress={() => setOpenMenu(true)}>
                    <IconBurgerMenu />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.menu}>
                    <View style={{ padding: 16, gap: 100 }}>
                      <Header onClose={setOpenMenu} />
                      <Menu />
                    </View>
                    <Image source={imageMenu} />
                  </View>
                )}
              </View>
            ),
            headerStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: "MacPawFixelDisplay_600",
    fontSize: 18,
    lineHeight: 24,
    color: "#121417",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  menu: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#85AA9F",
    width: 185,
    height: windowHeight,

    justifyContent: "space-between",
  },
  cross: {
    alignSelf: "flex-end",
  },
  name: {
    color: "rgb(18, 20, 23)",
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 16,
    lineHeight: 22,
  },
});
