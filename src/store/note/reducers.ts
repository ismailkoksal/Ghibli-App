import {ADD_NOTE, DELETE_NOTE, NoteActionTypes, NotesState} from './types';

const initialState: NotesState = {
  notes: [],
};

export function noteReducer(
  state = initialState,
  action: NoteActionTypes,
): NotesState {
  switch (action.type) {
    case ADD_NOTE:
      return {
        notes: [...state.notes, action.payload],
      };
    case DELETE_NOTE:
      return {
        notes: state.notes.filter(note => note.idFilm !== action.meta.id),
      };
    default:
      return state;
  }
}
