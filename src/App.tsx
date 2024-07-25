import { useCallback, useEffect, useState } from "react";
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
import dbService from "@services/dbService";

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    const initDb = async () => {
      await dbService.init();
      setIsDbReady(true);
    };

    initDb();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const isAppReady = isDbReady && fontsLoaded;

  if (!isAppReady) {
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
