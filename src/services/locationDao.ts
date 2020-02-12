import {Location} from '../models/Location';

export class LocationDao {
  private static readonly BASE_URL =
    'https://ghibliapi.herokuapp.com/locations';

  /**
   * Returns information about all of the Studio Ghibli locations. This broadly includes lands, countries, and places.
   */
  static getAllLocations(): Promise<Location[]> {
    return fetch(this.BASE_URL).then(response => response.json());
  }

  /**
   * Returns an individual location.
   * @param locationId Unique identifier representing a specific location
   */
  static getLocationById(locationId: string): Promise<Location> {
    return fetch(`${this.BASE_URL}/${locationId}`).then(response =>
      response.json(),
    );
  }
}
