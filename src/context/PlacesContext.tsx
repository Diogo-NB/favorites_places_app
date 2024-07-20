import { createContext, useState } from "react";
import Place from "../models/Place";

export type PlacesContextType = {
  places: Place[];
  addPlace: (place: Place) => void;
  deletePlace: (id: string) => void;
};

export const PlacesContext = createContext<PlacesContextType>({
  places: [],
  addPlace: () => {},
  deletePlace: () => {},
});

export function PlacesProvider({ children }: { children: React.ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([]);

  const addPlace = (place: Place) => {
    setPlaces((currPlaces) => [...currPlaces, place]);
  };

  const deletePlace = (id: string) => {
    setPlaces((currPlaces) => currPlaces.filter((place) => place.id !== id));
  };

  const ctxValue = {
    places: places,
    addPlace: addPlace,
    deletePlace: deletePlace,
  };

  return (
    <PlacesContext.Provider value={ctxValue}>{children}</PlacesContext.Provider>
  );
}
