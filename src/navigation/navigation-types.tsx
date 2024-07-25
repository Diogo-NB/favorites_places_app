import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { LatLng } from "react-native-maps";
import Place from "@models/Place";

export type RootStackParamList = {
  addPlace: undefined | { pickedLocation: LatLng };
  allPlaces: undefined;
  map: undefined;
  PlaceDetails: { place: Place };
};

export type AddPlacesProps = NativeStackScreenProps<
  RootStackParamList,
  "addPlace"
>;

export type AddPlaceRouteProp = RouteProp<RootStackParamList, "addPlace">;

export type AllPlacesProps = NativeStackScreenProps<
  RootStackParamList,
  "allPlaces"
>;

export type MapProps = NativeStackScreenProps<RootStackParamList, "map">;

export type PlaceDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "PlaceDetails"
>;

export const useRootStackNavigation = () => {
  return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
};
