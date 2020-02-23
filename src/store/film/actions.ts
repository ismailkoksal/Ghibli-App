import {Film} from '../../models/Film';
import {ADD_FILM, DELETE_FILM, FilmActionTypes} from './types';

export function addFilm(newFilm: Film): FilmActionTypes {
  return {
    type: ADD_FILM,
    payload: newFilm,
  };
}

export function deleteFilm(id: string): FilmActionTypes {
  return {
    type: DELETE_FILM,
    meta: {
      id,
    },
  };
}
