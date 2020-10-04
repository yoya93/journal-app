import "@testing-library/jest-dom";
import { login, logout } from "../../../components/actions/auth";
import { types } from "../../../types/types";

describe("pruebas en las actions de auth", () => {
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
});
