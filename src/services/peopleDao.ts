import {People} from '../models/People';

export class PeopleDao {
  private static readonly BASE_URL = 'https://ghibliapi.herokuapp.com/people';

  /**
   * Returns information about all of the Studio Ghibli people. This broadly includes all Ghibli characters, human and non-human.
   */
  static getAllPeople(): Promise<People[]> {
    return fetch(this.BASE_URL).then(response => response.json());
  }

  /**
   * Returns a person based on a single ID
   * @param peopleId Unique identifier representing a specific person
   */
  static getPeopleById(peopleId: string): Promise<People> {
    return fetch(`${this.BASE_URL}/${peopleId}`).then(response =>
      response.json(),
    );
  }
}
