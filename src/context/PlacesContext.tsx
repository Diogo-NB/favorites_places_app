import { createContext, useState } from "react";

import Place from "@models/Place";
import placesService from "@services/placesService";

export type PlacesContextType = {
  places: Place[];
  fetchPlaces: () => void;
  addPlace: (place: Place) => void;
  deletePlace: (id: string) => void;
  updatePlace: (place: Place) => void;
};

export const PlacesContext = createContext<PlacesContextType>({
  places: [],
  fetchPlaces: () => {},
  addPlace: () => {},
  deletePlace: () => {},
  updatePlace: () => {},
});

export function PlacesProvider({ children }: { children: React.ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([]);

  const addPlace = (place: Place) => {
    placesService.insert(place).then((result) => {
      place.id = result.lastInsertRowId.toString();
      setPlaces((currPlaces) => [...currPlaces, place]);
    });
  };

  const deletePlace = (id: string) => {
    placesService.delete(id).then(() => {
      setPlaces((currPlaces) => currPlaces.filter((place) => place.id !== id));
    });
  };

  const fetchPlaces = () => {
    placesService.fetch().then(setPlaces);
  };

  const updatePlace = (place: Place) => {
    placesService.update(place).then(() => {
      setPlaces((currPlaces) =>
        currPlaces.map((p) => (p.id === place.id ? place : p))
      );
    });
  };

  const ctxValue = {
    places: places,
    fetchPlaces,
    addPlace: addPlace,
    deletePlace: deletePlace,
    updatePlace: updatePlace,
  };

  return (
    <PlacesContext.Provider value={ctxValue}>{children}</PlacesContext.Provider>
  );
}
