import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import HomeNavigator from "./components/HomeNavigator";
import AuthNavigator from "./components/AuthNavigator";
import { useState } from "react";

const App = () => {
  // const isAuth = useSelector(selectIsAuth);
  const [isAuth, setIsAuth] = useState(true);

  const [fontsLoaded] = useFonts({
    MacPawFixelDisplay_400: require("./assets/fonts/FixelDisplay-Regular.ttf"),
    MacPawFixelDisplay_500: require("./assets/fonts/FixelDisplay-Medium.ttf"),
    MacPawFixelDisplay_600: require("./assets/fonts/FixelDisplay-SemiBold.ttf"),
    MacPawFixelDisplay_700: require("./assets/fonts/FixelDisplay-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return isAuth ? <HomeNavigator /> : <AuthNavigator />;
};

export default App;
