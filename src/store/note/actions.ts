import {ADD_NOTE, DELETE_NOTE, Note, NoteActionTypes} from './types';

export function addNote(newNote: Note): NoteActionTypes {
  return {
    type: ADD_NOTE,
    payload: newNote,
  };
}

export function deleteNote(id: string): NoteActionTypes {
  return {
    type: DELETE_NOTE,
    meta: {
      id,
    },
  };
}
