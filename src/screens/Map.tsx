import { useLayoutEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { LatLng } from "react-native-maps";
import { useRootStackNavigation } from "../navigation/navigation-types";
import MapView from "@components/MapView";
import { MapProps } from "../navigation/navigation-types";
import Place from "@models/Place";

export default function Map({ route, navigation }: MapProps) {
  if (route.params.mode === "view") {
    return MapModeView(route.params.place, navigation);
  } else if (route.params.mode === "save") {
    return MapModeSave(navigation);
  } else {
    throw new Error("Invalid mode");
  }
}

function MapModeView(
  place: Place,
  navigation: ReturnType<typeof useRootStackNavigation>
) {
  useLayoutEffect(() => {
    navigation.setOptions({ title: place.title });
  }, [navigation, place.title]);
  return <MapView initialLocation={place.location} />;
}

function MapModeSave(navigation: ReturnType<typeof useRootStackNavigation>) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Pick a location on the map",
    });
  }, [navigation]);

  const savePickedLocationHandler = (location: LatLng | undefined) => {
    if (!location) {
      Alert.alert(
        "No location picked",
        "Please pick a location by tapping on the map first.",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return;
    }

    navigation.navigate("addPlace", {
      pickedLocation: location,
    });
  };

  return <MapView onLocationSelected={savePickedLocationHandler} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
