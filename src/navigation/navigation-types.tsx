import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  allPlaces: undefined;
  addPlace: undefined;
};

export type AllPlacesProps = NativeStackScreenProps<
  RootStackParamList,
  "allPlaces"
>;
