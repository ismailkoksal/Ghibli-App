import {Film} from '../models/Film';

export class FilmDao {
  private static readonly BASE_URL = 'https://ghibliapi.herokuapp.com/films';

  /**
   * Returns information about all of the Studio Ghibli films.
   */
  static getAllFilms(): Promise<Film[]> {
    return fetch(this.BASE_URL).then(response => response.json());
  }

  /**
   * Returns a film based on a single ID
   * @param filmId Unique identifier representing a specific film
   */
  static getFilmById(filmId: string): Promise<Film> {
    return fetch(`${this.BASE_URL}/${filmId}`).then(response =>
      response.json(),
    );
  }

  static getFilmByUrl(url: string): Promise<Film> {
    return fetch(url).then(response => response.json());
  }
}
