import { memo, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import { getCurrentPositionAsync as getLocation } from "expo-location";

import { useLocationPermission } from "@util/permissions";
import { getAdress, getMapPreviewUrl, LocationData } from "@util/location";
import {
  AddPlaceRouteProp,
  useRootStackNavigation,
} from "../navigation/navigation-types";
import { useRoute } from "@react-navigation/native";
import { LatLng } from "react-native-maps";

interface LocationPickerProps {
  onLocationPicked: (location: LocationData) => void;
}

export function LocationPicker({ onLocationPicked }: LocationPickerProps) {
  const [pickedLocation, setPickedLocation] = useState<LatLng | null>(null);
  const hasPermission = useLocationPermission();

  const navigation = useRootStackNavigation();
  const route = useRoute<AddPlaceRouteProp>();

  useEffect(() => {
    const mapPickedLocation = route.params?.pickedLocation ?? null;
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
    }
  }, [route]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAdress(pickedLocation);
        onLocationPicked({ ...pickedLocation, address: address });
      }
    };

    handleLocation();
  }, [pickedLocation, onLocationPicked]);

  const getLocationHandler = async () => {
    if (hasPermission) {
      const location = await getLocation();
      setPickedLocation(location.coords);
    }
  };

  const pickOnMapHandler = () => {
    navigation.navigate("map", { mode: "save" });
  };

  let locationPreview = (
    <Text variant="labelSmall">No location picked yet.</Text>
  );

  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{ uri: getMapPreviewUrl(pickedLocation!) }}
        style={styles.image}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <Button icon="google-maps" mode="outlined" onPress={getLocationHandler}>
          Locate User
        </Button>
        <Button icon="map" mode="outlined" onPress={pickOnMapHandler}>
          Pick on Map
        </Button>
      </View>
    </View>
  );
}

export default memo(LocationPicker);

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
});
