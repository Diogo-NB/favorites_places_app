import { View, Text } from "react-native";
import Place from "../models/Place";

interface PlaceItemProps {
  place: Place;
}

export default function PlaceItem({ place }: PlaceItemProps) {
  return (
    <View>
      <Text>{place.title}</Text>
      <Text>{place.address}</Text>
    </View>
  );
}
