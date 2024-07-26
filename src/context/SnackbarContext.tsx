import { createContext, useState } from "react";
import { Portal, Snackbar, Text } from "react-native-paper";

export type SnackbarContextType = {
  showSnackbar: (options: {
    message: string;
    action?: { label: string; onPress: () => void } | undefined;
  }) => void;
  isSnackbarVisible: boolean;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
  isSnackbarVisible: false,
});

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState<
    { label: string; onPress: () => void } | undefined
  >();

  const show = (options: {
    message: string;
    action?: { label: string; onPress: () => void } | undefined;
  }) => {
    setMessage(options.message);
    setAction(options.action);
    setIsVisible(true);
  };

  return (
    <SnackbarContext.Provider
      value={{ showSnackbar: show, isSnackbarVisible: isVisible }}
    >
      {children}
      <Portal>
        <Snackbar
          visible={isVisible}
          duration={3000}
          onDismiss={() => setIsVisible(false)}
          action={action}
        >
          <Text variant="labelSmall">{message}</Text>
        </Snackbar>
      </Portal>
    </SnackbarContext.Provider>
  );
}
