import { useMemo, useState } from "react";
import RNMapView, { MapPressEvent, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { LatLng } from "react-native-maps";
import { FAB } from "react-native-paper";

type MapViewProps = {
  initialLocation?: LatLng;
  onLocationSelected?: (location: LatLng | undefined) => void;
};

export default function MapView({
  initialLocation,
  onLocationSelected,
}: MapViewProps) {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const initialRegion = useMemo(
    () => ({
      latitude: initialLocation?.latitude ?? -19.7585,
      longitude: initialLocation?.longitude ?? -47.9303,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
    [initialLocation]
  );

  const onMapPress: (event: MapPressEvent) => void = ({ nativeEvent }) => {
    setSelectedLocation(nativeEvent.coordinate);
  };

  const onLocationSelectedHandler = () =>
    onLocationSelected?.(selectedLocation);

  return (
    <View style={styles.container}>
      <RNMapView
        initialRegion={initialRegion}
        onPress={onMapPress}
        style={styles.map}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Picked Location" />
        )}
      </RNMapView>
      {onLocationSelected && (
        <FAB
          variant="primary"
          icon="check"
          label="Confirm"
          style={styles.fab}
          onPress={onLocationSelectedHandler}
        />
      )}
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
