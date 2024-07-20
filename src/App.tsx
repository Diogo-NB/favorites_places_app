import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { registerRootComponent } from "expo";
import AppThemeProvider from "./theme/AppThemeProvider";
import RootNavigationContainer from "./navigation/navigation-container";
import { PlacesProvider } from "./context/PlacesContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppThemeProvider>
      <PlacesProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <RootNavigationContainer />
        </View>
      </PlacesProvider>
    </AppThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

registerRootComponent(App);
