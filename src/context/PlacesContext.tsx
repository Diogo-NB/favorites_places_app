import { createContext, useState } from "react";
import Place from "@models/Place";
import placesService from "@services/placesService";

export type PlacesContextType = {
  places: Place[];
  fetchPlaces: () => void;
  addPlace: (place: Place) => void;
  deletePlace: (id: string) => void;
};

export const PlacesContext = createContext<PlacesContextType>({
  places: [],
  fetchPlaces: async () => {},
  addPlace: async () => {},
  deletePlace: async () => {},
});

export function PlacesProvider({ children }: { children: React.ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([]);

  const addPlace = async (place: Place) => {
    const result = await placesService.insert(place);
    place.id = result.lastInsertRowId.toString();
    setPlaces((currPlaces) => [...currPlaces, place]);
  };

  const deletePlace = async (id: string) => {
    setPlaces((currPlaces) => currPlaces.filter((place) => place.id !== id));
  };

  const fetchPlaces = async () => {
    const result = await placesService.fetch();
    setPlaces(result);
  };

  const ctxValue = {
    places: places,
    fetchPlaces,
    addPlace: addPlace,
    deletePlace: deletePlace,
  };

  return (
    <PlacesContext.Provider value={ctxValue}>{children}</PlacesContext.Provider>
  );
}
