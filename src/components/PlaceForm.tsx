import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";

export default function PlaceForm() {
  const [placeTitle, setPlaceTitle] = useState("");

  const changePlaceTitleHandler = useCallback((text: string) => {
    setPlaceTitle(text);
  }, []);

  return (
    <ScrollView style={styles.formContainer}>
      <TextInput
        mode="outlined"
        onChangeText={changePlaceTitleHandler}
        value={placeTitle}
        label={"Place Title"}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
  },
});
