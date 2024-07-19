import PlaceForm, { PlaceFormState } from "../components/PlaceForm";
import Place from "../models/Place";
import { AddPlacesProps } from "../navigation/navigation-types";

export default function AddPlace({ navigation }: AddPlacesProps) {
  const createPlaceHandler = (formResult: PlaceFormState) => {
    const place = new Place(
      formResult.title,
      formResult.imageUri,
      formResult.location!
    );

    console.log('New place: ', place);
  };

  return <PlaceForm onSubmit={createPlaceHandler} />;
}
