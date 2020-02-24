export interface Note {
  idFilm: string;
  message: string;
}

export interface NotesState {
  notes: Note[];
}

export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

interface AddNoteAction {
  type: typeof ADD_NOTE;
  payload: Note;
}

interface DeleteNoteAction {
  type: typeof DELETE_NOTE;
  meta: {
    id: string;
  };
}

export type NoteActionTypes = AddNoteAction | DeleteNoteAction;
