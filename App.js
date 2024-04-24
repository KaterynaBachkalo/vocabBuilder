import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import HomeNavigator from "./components/HomeNavigator";
import AuthNavigator from "./components/AuthNavigator";
import { useState } from "react";

const App = () => {
  // const isAuth = useSelector(selectIsAuth);
  const [isAuth, setIsAuth] = useState(false);

  const [fontsLoaded] = useFonts({
    MacPawFixelDisplay_400: require("./assets/fonts/FixelDisplay-Regular.ttf"),
    MacPawFixelDisplay_600: require("./assets/fonts/FixelDisplay-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return isAuth ? <HomeNavigator /> : <AuthNavigator />;
};

export default App;
