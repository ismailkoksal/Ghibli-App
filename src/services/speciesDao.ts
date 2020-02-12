import {Specie} from '../models/Specie';

export class SpeciesDao {
  private static readonly BASE_URL = 'https://ghibliapi.herokuapp.com/species';

  /**
   * Returns information about all of the Studio Ghibli species. This includes humans, animals, and spirits et al.
   */
  static getAllSpecies(): Promise<Specie[]> {
    return fetch(this.BASE_URL).then(response => response.json());
  }

  /**
   * Returns an individual species
   * @param speciesId Unique identifier representing a specific species
   */
  static getSpeciesById(speciesId: string): Promise<Specie> {
    return fetch(`${this.BASE_URL}/${speciesId}`).then(response =>
      response.json(),
    );
  }
}
