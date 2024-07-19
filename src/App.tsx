import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { registerRootComponent } from "expo";
import AppThemeProvider from "./theme/AppThemeProvider";

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
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Text variant="displayMedium">Display Medium</Text>

        <Text variant="headlineMedium">Headline Medium</Text>

        <Text variant="titleMedium">Title Medium</Text>

        <Text variant="bodyMedium">Body Medium</Text>

        <Text variant="labelMedium">Label Medium</Text>
      </View>
    </AppThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

registerRootComponent(App);
