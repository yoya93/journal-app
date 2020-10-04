import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; // simulo que estoy dentro de una router para ke se pueda usar el link

import { login } from "../../../components/actions/auth";
import { types } from "../../../types/types";
import { AppRouter } from "../../../routers/AppRouter";
import { act } from "react-dom/test-utils";

import { firebase } from "../../../firebase/firebase-config";

const middlewares = [thunk];

jest.mock("../../../components/actions/auth", () => ({
  // se le hace un tranking a la func para saber si es disparada en el component
  // pero como se llamam dentro de un dispatcher es necesario seguir tambien al store.dispatcher
  login: jest.fn(),
}));

const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "ef",
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Pruebas en <AppRouter />", () => {
  test("debe de disparar el login", async () => {
    const email = "test@testing.com";
    const password = "123456";

    await act(async () => {
      const usercred = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith("2zaA3t6PqJaZVhrSA90kkBBbWRs1", null);
  }, 20000);
});
