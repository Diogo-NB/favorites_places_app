import { useLayoutEffect } from "react";
import { Alert } from "react-native";
import { LatLng } from "react-native-maps";

import { useRootStackNavigation, MapProps } from "@navigation/navigation-types";
import MapView from "@components/MapView";
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