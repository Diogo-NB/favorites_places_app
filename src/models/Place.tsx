export default class Place {
  constructor(
    public title: string,
    public imageUri: string,
    public address: string,
    public location: {
      lat: number;
      lng: number;
    },
    public id?: string
  ) {
    if (!id) {
      // TODO remove later
      id = new Date().toISOString() + Math.random().toString();
    }
  }
}
