import "@testing-library/jest-dom";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("pruebas en el authReducer", () => {
  test("debe retornar el state (action no reconocida)", () => {
    const initialState = {};

    const action = {
      type: "kdfhgkdh",
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({});
  });

  test("debe de devolver el uid y el displayname (Login)", () => {
    const initialState = {};
    const actionLogin = {
      type: types.login,
      payload: {
        uid: "jdsniehdiasfasajfhalsidj",
        displayName: "Yoya",
      },
    };

    const state = authReducer(initialState, actionLogin);

    expect(state).toEqual({
      uid: actionLogin.payload.uid,
      name: actionLogin.payload.displayName,
    });
  });

  test("debe devolver un objeto vacio (Logout)", () => {
    const initialState = {
      ui: "jdsniehdiasfasajfhalsidj",
      name: "Yoya",
    };
    const actionLogout = {
      type: types.logout,
    };
    const state = authReducer(initialState, actionLogout);

    expect(state).toEqual({});
  });
});
