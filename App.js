import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import AppNavigation from "./components/AppNavigation";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { Text } from "react-native";

const App = () => {
  const [fontsLoaded] = useFonts({
    MacPawFixelDisplay_400: require("./assets/fonts/FixelDisplay-Regular.ttf"),
    MacPawFixelDisplay_500: require("./assets/fonts/FixelDisplay-Medium.ttf"),
    MacPawFixelDisplay_600: require("./assets/fonts/FixelDisplay-SemiBold.ttf"),
    MacPawFixelDisplay_700: require("./assets/fonts/FixelDisplay-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
