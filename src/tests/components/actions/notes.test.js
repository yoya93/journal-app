import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import {
  startNewNotes,
  deleteNote,
  startDeleting,
  startLoadingNotes,
  startSaveNotes,
  startUploading,
} from "../../../components/actions/notes";
import { types } from "../../../types/types";
import { db } from "../../../firebase/firebase-config";
import { fileUpload } from "../../../helpers/fileUpload";

// con el mock simulo la respuesta de la function fileUpload (es decir ke ya se alojo la img en cloudunary)
//y despues puedo comprobar si el url ke estoy simulamdo se graba en
// en la note
jest.mock("../../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(() => {
    // return Promise.resolve(
    //   "https://test-pruebas.com/simulandoRetornoImagen.jpg"
    // );

    return "https://test-pruebas.com/simulandoRetornoImagen.jpg";
  }),
}));

const middlewares = [thunk];

const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "nMptx4590bMtamI0Fl6v",
      title: "TEST",
      body: "Test",
    },
  },
};

let store = mockStore(initState);

describe("pruebas en las aciones notes (asincronas)", () => {
  beforeEach(() => {
    store = mockStore(initState);
  }); // limpio el store para que se borren las acciones antes de cada prueba

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

  test("debe de cargar las  notas startLoadingNotes", async () => {
    await store.dispatch(startLoadingNotes(initState.auth));

    const actions = store.getActions();
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };
    expect(actions[0].payload[0]).toMatchObject(expected);

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });
  }, 20000);

  test("startSaveNotes debe de actualizar la nota", async () => {
    const note = {
      id: "nMptx4590bMtamI0Fl6v",
      title: "Mi titulo de test",
      body: "body Test",
    };

    await store.dispatch(startSaveNotes(note));

    const actions = store.getActions();

    const noteCloud = await db.doc(`TESTING/journal/notes/${note.id}`).get();

    expect(actions[0].type).toBe(types.notesUpdate);
    expect(note.title).toEqual(noteCloud.data().title);
  }, 20000);

  test("startUploading debe de subir un file", async () => {
    const file = new File([], "foto.jpg");

    await store.dispatch(startUploading(file));

    const noteCloud = await db
      .doc(`TESTING/journal/notes/${initState.notes.active.id}`)
      .get();

    expect(noteCloud.data().imageUrl).toBe(
      "https://test-pruebas.com/simulandoRetornoImagen.jpg"
    );
  }, 20000);
});
