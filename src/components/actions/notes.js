import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";
import { loadNotes } from "../../helpers/loadNotes";

export const startNewNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNotes(doc.id, newNote));

    console.log(doc);
  };
};

export const activeNotes = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (user) => {
  return async (dispatch) => {
    const notes = await loadNotes(user.uid);
    dispatch(setNote(notes));
  };
};

export const setNote = (note) => ({
  type: types.notesLoad,

  payload: note,
});

export const startSaveNotes = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const noteToFirestore = { ...note };

    delete noteToFirestore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
  };
};
