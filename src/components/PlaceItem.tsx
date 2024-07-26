import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import Place from "@models/Place";
import { PlacesContext } from "@context/PlacesContext";
import { useRootStackNavigation } from "@navigation/navigation-types";

interface PlaceItemProps {
  place: Place;
}

export default function PlaceItem({ place }: PlaceItemProps) {
  const navigation = useRootStackNavigation();
  const { deletePlace } = useContext(PlacesContext);

  if (!place.id) throw new Error("Place id is required");

  const viewOnMapHandler = () => {
    navigation.navigate("map", { mode: "view", place });
  };

  const handleViewPlace = () => {
    navigation.navigate("PlaceDetails", { place });
  };

  const deletePlaceHandler = () => {
    deletePlace(place.id!);
  };

  return (
    <View style={styles.cardContainer}>
      <Card mode="elevated" onPress={handleViewPlace}>
        <Card.Title title={place.title} subtitle={place.location.address} />
        <Card.Cover style={styles.cardCover} source={{ uri: place.imageUri }} />
        <Card.Actions>
          <Button mode="text" icon={"map"} onPress={viewOnMapHandler}>
            View on map
          </Button>
          <Button mode="contained" icon={"delete"} onPress={deletePlaceHandler}>
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
  },
  cardCover: {
    paddingHorizontal: 9,
    height: 200,
    width: "100%",
  },
});
