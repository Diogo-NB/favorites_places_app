import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import theme from "./theme";
import { StatusBar } from "expo-status-bar";

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  const colorScheme = useColorScheme();

  const paperTheme = colorScheme === "dark" ? theme.dark : theme.light;

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>
    </>
  );
}