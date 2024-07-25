import { useState } from "react";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { Alert, StyleSheet, View } from "react-native";
import { LatLng } from "react-native-maps";
import { useRootStackNavigation } from "../navigation/navigation-types";
import { FAB } from "react-native-paper";

const initialRegion = {
  latitude: -19.7585,
  longitude: -47.9303,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const navigation = useRootStackNavigation();

  const onMapPress: (event: MapPressEvent) => void = ({ nativeEvent }) => {
    setSelectedLocation(nativeEvent.coordinate);
  };

  const savePickedLocationHandler = () => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "Please pick a location by tapping on the map first.",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return;
    }

    navigation.navigate("addPlace", {
      pickedLocation: selectedLocation,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={initialRegion}
        style={styles.map}
        onPress={onMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Picked Location" />
        )}
      </MapView>
      <FAB
        variant="primary"
        icon="check"
        label="Confirm"
        style={styles.fab}
        onPress={savePickedLocationHandler}
      />
    </View>
  );
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
