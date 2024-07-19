import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { getCurrentPositionAsync as getLocation } from "expo-location";
import { useLocationPermission } from "../util/permissions";

export default function LocationPicker() {
  const hasPermission = useLocationPermission();

  const getLocationHandler = () => {};

  const pickOnMapHandler = () => {};

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <Button icon="map-marker" mode="contained" onPress={getLocationHandler}>
          Locate User
        </Button>
        <Button icon="map" mode="contained" onPress={pickOnMapHandler}>
          Pick on Map
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
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
