import {
  ADD_FILM,
  DELETE_FILM,
  FilmActionTypes,
  MustSeeFilmsState,
} from './types';

const initialState: MustSeeFilmsState = {
  mustSeeFilms: [],
};

export function filmReducer(
  state = initialState,
  action: FilmActionTypes,
): MustSeeFilmsState {
  switch (action.type) {
    case ADD_FILM:
      return {
        mustSeeFilms: state.mustSeeFilms.find(
          film => film.id === action.payload.id,
        )
          ? [...state.mustSeeFilms]
          : [...state.mustSeeFilms, action.payload],
      };
    case DELETE_FILM:
      return {
        mustSeeFilms: state.mustSeeFilms.filter(
          film => film.id !== action.meta.id,
        ),
      };
    default:
      return state;
  }
}
