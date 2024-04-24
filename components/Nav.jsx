import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import burgerMenu from "../images/burgermenu-white.png";
import cross from "../images/cross.png";

const Nav = () => {
  const navigation = useNavigation();

  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpenBurgerMenu(true)}>
        {!isOpenBurgerMenu && <Image source={burgerMenu} />}
      </TouchableOpacity>
      {isOpenBurgerMenu && (
        <View
          style={{
            position: "relative",
          }}
        >
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => setIsOpenBurgerMenu(false)}>
              <Image source={cross} style={styles.cross} />
            </TouchableOpacity>

            <View style={{ gap: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("News")}
                style={[
                  styles.button,
                  hoveredButton === "news" && styles.buttonHovered,
                ]}
                onMouseEnter={() => handleMouseEnter("news")}
                onMouseLeave={handleMouseLeave}
              >
                <Text style={styles.buttonText}>News</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Find pet")}
                style={[
                  styles.button,
                  hoveredButton === "findPet" && styles.buttonHovered,
                ]}
                onMouseEnter={() => handleMouseEnter("findPet")}
                onMouseLeave={handleMouseLeave}
              >
                <Text style={styles.buttonText}>Find pet</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Our friends")}
                style={[
                  styles.button,
                  hoveredButton === "ourFriends" && styles.buttonHovered,
                ]}
                onMouseEnter={() => handleMouseEnter("ourFriends")}
                onMouseLeave={handleMouseLeave}
              >
                <Text style={styles.buttonText}>Our friends</Text>
              </TouchableOpacity>
            </View>

            <View style={{ gap: 8 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={[
                  styles.button,
                  hoveredButton === "login" && styles.buttonHovered,
                ]}
                onMouseEnter={() => handleMouseEnter("login")}
                onMouseLeave={handleMouseLeave}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
                style={[
                  styles.button,
                  hoveredButton === "registration" && styles.buttonHovered,
                ]}
                onMouseEnter={() => handleMouseEnter("registration")}
                onMouseLeave={handleMouseLeave}
              >
                <Text style={styles.buttonText}>Registration</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  menu: {
    height: Dimensions.get("window").height,
    position: "absolute",
    paddingRight: 20,
    paddingTop: 28,
    paddingBottom: 40,
    paddingLeft: 20,
    right: -40,
    top: -40,
    width: 218,
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 20,
  },
  cross: {
    alignSelf: "flex-end",
  },
  button: {
    borderRadius: 30,
    borderColor: "rgba(38, 38, 38, 0.15);",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 15,
  },
  buttonText: {
    color: "rgb(38, 38, 38)",
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "center",
  },
  buttonHovered: {
    borderRadius: 30,
    borderColor: "rgb(246, 184, 61)",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 15,
  },
});
