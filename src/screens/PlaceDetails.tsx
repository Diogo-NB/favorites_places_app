import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-paper";

import {
  PlaceDetailsProps,
  useRootStackNavigation,
} from "../navigation/navigation-types";
import { useLayoutEffect } from "react";

export default function PlaceDetails({ route }: PlaceDetailsProps) {
  const { place } = route.params;
  const navigation = useRootStackNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: place.title });
  }, [navigation, place.title]);

  const viewOnMapHandler = () => {
    navigation.navigate("map", { mode: "view", place });
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text variant="titleSmall">{place.title}</Text>
          <Text variant="labelSmall">{place.location.address}</Text>
        </View>
        <Button mode="contained" icon={"map"} onPress={viewOnMapHandler}>
          View on map
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginVertical: 20,
  },
  addressContainer: {
    padding: 20,
  },
});
