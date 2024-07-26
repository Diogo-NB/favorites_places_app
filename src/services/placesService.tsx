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

export async function deletePlace(id: string) {
  return db.runAsync("DELETE FROM places WHERE id = ?;", id);
}

export async function updatePlace(place: Place) {
  if (!place.id) {
    throw new Error("Cannot update a place without an id");
  }

  return db.runAsync(
    "UPDATE places SET title = ?, imageUri = ?, address = ?, lat = ?, lng = ? WHERE id = ?;",
    place.title,
    place.imageUri,
    place.location.address,
    place.location.latitude,
    place.location.longitude,
    place.id
  );
}

export const placesService = {
  insert: insertPlace,
  fetch: fetchPlaces,
  delete: deletePlace,
  update: updatePlace,
};

export default placesService;
