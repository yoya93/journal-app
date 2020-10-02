import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";
import { loadNotes } from "../../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../../helpers/fileUpload";

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

    if (!note.imageUrl) {
      delete note.imageUrl;
    }

    const noteToFirestore = { ...note };

    delete noteToFirestore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

    dispatch(refreshNote(note.id, noteToFirestore));

    Swal.fire("Saved", note.title, "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    ...note,
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNotes } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: "false",
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);

    activeNotes.imageUrl = fileUrl;

    console.log(activeNotes);

    dispatch(startSaveNotes(activeNotes));

    Swal.close();

    console.log(fileUrl);
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,

  payload: id,
});
