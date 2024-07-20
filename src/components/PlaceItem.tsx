import { View, StyleSheet } from "react-native";
import Place from "../models/Place";
import { Button, Card, Text } from "react-native-paper";
import { useContext } from "react";
import { PlacesContext } from "../context/PlacesContext";

interface PlaceItemProps {
  place: Place;
}

export default function PlaceItem({ place }: PlaceItemProps) {
  const { deletePlace } = useContext(PlacesContext);

  const handleDeletePlace = () => {
    if (!place.id) throw new Error("Place ID is missing");
    deletePlace(place.id);
  };

  return (
    <View style={styles.cardContainer}>
      <Card mode="elevated">
        <Card.Title title={place.title} subtitle={place.location.address} />
        <Card.Cover style={styles.cardCover} source={{ uri: place.imageUri }} />
        <Card.Content>
          <Card.Actions>
            <Button icon={"delete"} onPress={handleDeletePlace}>
              Delete
            </Button>
          </Card.Actions>
        </Card.Content>
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
