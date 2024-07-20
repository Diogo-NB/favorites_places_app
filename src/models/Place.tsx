import { LocationData } from "../util/location";

export default class Place {
  public id?: string;

  constructor(
    public title: string,
    public imageUri: string,
    public location: LocationData,
    id?: string | undefined
  ) {
    if (id) {
      this.id = id;
    } else {
      // TODO remove later
      this.id = new Date().toISOString() + Math.random().toString();
    }
  }
}
