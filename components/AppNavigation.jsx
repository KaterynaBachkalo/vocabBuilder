import React, { useEffect } from "react";
import HomeNavigator from "./HomeNavigator";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../redux/auth/selectors";
import { currentUserThunk } from "../redux/auth/operations";

const AppNavigation = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(currentUserThunk());
  }, [dispatch]);

  return isAuth ? <HomeNavigator /> : <AuthNavigator />;
};

export default AppNavigation;
