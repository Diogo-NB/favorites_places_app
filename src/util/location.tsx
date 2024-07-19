import { LatLng } from "react-native-maps";

const GOOGLE_API_KEY = "AIzaSyDwFj5ReYeTY-7zjAWvCUkD5lewcNMM4R0";

export function getMapPreviewUrl({ latitude, longitude }: LatLng) {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${latitude},${longitude}
&key=${GOOGLE_API_KEY}`;
  return url;
}

export async function getAdress({ latitude, longitude }: LatLng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch address");
  }

  const data = await res.json();
  const address = data.results[0].formatted_address as string;
  return address;
}
