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

export const placesService = {
  insertPlace,
};

export default placesService;
