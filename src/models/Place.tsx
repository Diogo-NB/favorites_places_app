import { LocationData } from "../util/location";

export default class Place {
  constructor(
    public title: string,
    public imageUri: string,
    public location: LocationData,
    public id?: string | undefined
  ) {}

  static fromJson(json: any): Place {
    return new Place(
      json.title,
      json.imageUri,
      {
        address: json.address,
        latitude: json.lat,
        longitude: json.lng,
      },
      json.id
    );
  }
}
