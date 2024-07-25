import Place from "@models/Place";
import { db } from "@services/dbService";

export async function insertPlace(place: Place) {
  return db.runAsync(
    "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);",
    place.title,
    place.imageUri,
    place.location.address,
    place.location.latitude,
    place.location.longitude
  );
}

export async function fetchPlaces() {
  const result: any[] = await db.getAllAsync("SELECT * FROM places;");
  return result.map(Place.fromJson);
}

export const placesService = {
  insert: insertPlace,
  fetch: fetchPlaces,
};

export default placesService;
