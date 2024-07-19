import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { LatLng } from "react-native-maps";

type PlaceFormState = {
  title: string;
  imageUri: string;
  location: Location | null;
};

export type Location = LatLng & { address: string };

export default function PlaceForm() {
  const [formState, setFormState] = useState<PlaceFormState>({
    title: "",
    imageUri: "",
    location: null,
  });

  const changeTitleHandler = useCallback((title: string) => {
    setFormState((prevState) => ({
      ...prevState,
      title,
    }));
  }, []);

  const changeImageHandler = useCallback((imageUri: string) => {
    setFormState((prevState) => ({
      ...prevState,
      imageUri,
    }));
  }, []);

  const changeLocationHandler = useCallback(
    (location: Location) => {
      setFormState((prevState) => ({
        ...prevState,
        location,
      }));
    },
    []
  );

  const submitHandler = () => {
    console.log(formState);
  };

  return (
    <ScrollView style={styles.formContainer}>
      <TextInput
        mode="outlined"
        onChangeText={changeTitleHandler}
        value={formState.title}
        label={"Place Title"}
      />
      <ImagePicker onImageTaken={changeImageHandler} />
      <LocationPicker onLocationPicked={changeLocationHandler} />
      <Button mode="outlined" style={styles.button} onPress={submitHandler}>
        Add Place
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
  },
  button: {
    width: "40%",
    alignSelf: "center",
  },
});
