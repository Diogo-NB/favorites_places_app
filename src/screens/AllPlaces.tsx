import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import PlacesList from "@components/PlacesList";
import { AllPlacesProps } from "@navigation/navigation-types";
import { PlacesContext } from "@context/PlacesContext";
import { SnackbarContext } from "@context/SnackbarContext";

export default function AllPlaces({ navigation }: AllPlacesProps) {
  const { places, fetchPlaces } = useContext(PlacesContext);
  const { isSnackbarVisible } = useContext(SnackbarContext);

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <>
      <PlacesList places={places} />
      {!isSnackbarVisible && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("addPlace")}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
