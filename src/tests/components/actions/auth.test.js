import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import {
  login,
  logout,
  startLogout,
  startLoginEmailPassword,
} from "../../../components/actions/auth";
import { types } from "../../../types/types";

const middlewares = [thunk];

const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);

describe("pruebas en las actions de auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test("login y logout deben de crear las acciones", () => {
    let action = login("sdgfksjhdf", "yoyajr");

    expect(action).toEqual({
      type: types.login,
      payload: {
        uid: "sdgfksjhdf",
        displayName: "yoyajr",
      },
    });
    action = logout();

    expect(action).toEqual({
      type: types.logout,
    });
  });

  test("debe de realizar el logout en startLogout", async () => {
    await store.dispatch(startLogout());

    const action = store.getActions();

    expect(action[0]).toEqual({
      type: types.logout,
    });
    expect(action[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("debe de iniciar el startLoginEmailPassword", async () => {
    const email = "test@testing.com";
    const password = "123456";

    await store.dispatch(startLoginEmailPassword(email, password));
    const action = store.getActions();

    expect(action[2]).toEqual({
      type: types.login,
      payload: {
        uid: expect.any(String), // tambien se puede copiar en duro el uid que tenemso en el firestore de prueba
        displayName: null,
      },
    });
    // expect(action[1]).toEqual({
    //   type: types.notesLogoutCleaning,
    // });
  }, 20000);
});
