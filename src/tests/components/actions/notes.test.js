import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import {
  startNewNotes,
  deleteNote,
  startDeleting,
} from "../../../components/actions/notes";
import { types } from "../../../types/types";
import { db } from "../../../firebase/firebase-config";

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const store = mockStore({
  auth: {
    uid: "TESTING",
  },
});

describe("pruebas en las aciones notes (asincronas)", () => {
  test("debe de crear una nueva nota startNote", async () => {
    await store.dispatch(startNewNotes());

    let actions = store.getActions(); // fetch las actions que se disparan despues
    const docId = actions[0].payload.id;
    // await store.dispatch(startDeleting(docId));
    // actions = store.getActions(); // fetch las actions que se disparan despues

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    await db.doc(`TESTING/journal/notes/${docId}`).delete();

    // expect(actions[2]).toEqual({
    //   type: types.notesDelete,
    //   payload: expect.any(String),
    // });

    // console.log(actions);
  }, 20000);
});
