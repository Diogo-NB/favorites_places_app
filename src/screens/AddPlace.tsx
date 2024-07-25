import { useContext } from "react";
import PlaceForm from "../components/PlaceForm";
import Place from "../models/Place";
import { AddPlacesProps } from "../navigation/navigation-types";
import { PlacesContext } from "../context/PlacesContext";

export default function AddPlace({ navigation }: AddPlacesProps) {
  const { addPlace } = useContext(PlacesContext);

  const addPlaceHandler = async (place: Place) => {
    try {
      addPlace(place);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return <PlaceForm onAddPlace={addPlaceHandler} />;
}
