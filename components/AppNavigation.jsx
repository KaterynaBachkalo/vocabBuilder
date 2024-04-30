import React from "react";
import HomeNavigator from "./HomeNavigator";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/auth/selectors";

const AppNavigation = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <HomeNavigator /> : <AuthNavigator />;
};

export default AppNavigation;
