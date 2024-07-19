import { LocationData } from "../util/location";

export default class Place {
  constructor(
    public title: string,
    public imageUri: string,
    public location: LocationData,
    public id?: string
  ) {
    if (!id) {
      // TODO remove later
      id = new Date().toISOString() + Math.random().toString();
    }
  }

}
