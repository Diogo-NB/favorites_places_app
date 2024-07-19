import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import PlacesList from "../components/PlacesList";
import { AllPlacesProps } from "../navigation/navigation-types";

export default function AllPlaces({ navigation }: AllPlacesProps) {
  return (
    <>
      <PlacesList places={[]} />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("addPlace")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
