import { useContext } from "react";
import PlaceForm from "../components/PlaceForm";
import Place from "../models/Place";
import { AddPlacesProps } from "../navigation/navigation-types";
import { PlacesContext } from "../context/PlacesContext";

export default function AddPlace({ navigation }: AddPlacesProps) {
  const { addPlace } = useContext(PlacesContext);

  const addPlaceHandler = (place: Place) => {
    addPlace(place);
    navigation.goBack();
  };

  return <PlaceForm onAddPlace={addPlaceHandler} />;
}
