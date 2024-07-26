import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";

import Place from "@models/Place";
import PlaceItem from "@components/PlaceItem";

interface PlacesProps {
  places: Place[];
}

function EmptyListPlaceholder() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="bodyMedium">
        No places found. Maybe start adding some!
      </Text>
    </View>
  );
}

export default function PlacesList({ places }: PlacesProps) {
  const keyExtractor = useCallback((item: Place) => {
    if (item.id) {
      return item.id;
    } else {
      throw new Error(
        "A Place id is missing in PlacesList component. Place: " + item
      );
    }
  }, []);

  const renderItem = useCallback(({ item }: { item: Place }) => {
    return <PlaceItem place={item} />;
  }, []);

  if (places.length === 0) return <EmptyListPlaceholder />;

  return (
    <FlatList
      style={{ flex: 1 }}
      data={places}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}
