import {Film} from '../../models/Film';

export interface MustSeeFilmsState {
  mustSeeFilms: Film[];
}

export const ADD_FILM = 'ADD_FILM';
export const DELETE_FILM = 'DELETE_FILM';

interface AddFilmAction {
  type: typeof ADD_FILM;
  payload: Film;
}

interface DeleteFilmAction {
  type: typeof DELETE_FILM;
  meta: {
    id: string;
  };
}

export type FilmActionTypes = AddFilmAction | DeleteFilmAction;
