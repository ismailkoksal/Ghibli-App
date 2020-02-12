import {Vehicle} from '../models/Vehicle';

export class VehicleDao {
  private static readonly BASE_URL = 'https://ghibliapi.herokuapp.com/vehicles';

  /**
   * Returns information about all of the Studio Ghibli vehicles. This includes cars, ships, and planes.
   */
  static getAllVehicles(): Promise<Vehicle[]> {
    return fetch(this.BASE_URL).then(response => response.json());
  }

  /**
   * Returns an individual vehicle
   * @param vehicleId Unique identifier representing a specific vehicle
   */
  static getVehicleById(vehicleId: string): Promise<Vehicle> {
    return fetch(`${this.BASE_URL}/${vehicleId}`).then(response =>
      response.json(),
    );
  }
}
