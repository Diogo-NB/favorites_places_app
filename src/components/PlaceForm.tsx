import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

import ImagePicker from "@components/ImagePicker";
import LocationPicker from "@components/LocationPicker";
import { LocationData } from "@util/location";
import Place from "@models/Place";

export type PlaceFormState = {
  title: string;
  imageUri: string;
  location: LocationData | null;
};

interface PlaceFormProps {
  onAddPlace: (place: Place) => void;
}

export default function PlaceForm({ onAddPlace }: PlaceFormProps) {
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

  const changeLocationHandler = useCallback((location: LocationData) => {
    setFormState((prevState) => ({
      ...prevState,
      location,
    }));
  }, []);

  const submitHandler = () => {
    const place = new Place(
      formState.title,
      formState.imageUri,
      formState.location!
    );

    onAddPlace(place);
  };

  return (
    <ScrollView style={styles.formContainer}>
      <TextInput
        mode="outlined"
        onChangeText={changeTitleHandler}
        value={formState.title}
        label={"Place Title"}
        style={styles.titleInput}
      />
      <ImagePicker onImageTaken={changeImageHandler} />
      <LocationPicker onLocationPicked={changeLocationHandler} />
      <Button
      icon={"home-plus"}
        mode="contained"
        style={styles.confirmButton}
        onPress={submitHandler}
      >
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
  confirmButton: {
    width: "40%",
    alignSelf: "center",
    marginTop: 15,
  },
  titleInput: {
    marginBottom: 5,
  },
});
