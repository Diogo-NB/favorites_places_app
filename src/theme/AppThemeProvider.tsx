import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import theme from "./theme";

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  const colorScheme = useColorScheme();

  const paperTheme = colorScheme === "dark" ? theme.dark : theme.light;

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}
