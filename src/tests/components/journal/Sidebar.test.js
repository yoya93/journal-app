import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; // simulo que estoy dentro de una router para ke se pueda usar el link

import { startLogout } from "../../../components/actions/auth";

import { Sidebar } from "../../../components/journal/Sidebar";
import { startNewNotes } from "../../../components/actions/notes";

const middlewares = [thunk];

jest.mock("../../../components/actions/auth", () => ({
  startLogout: jest.fn(),
}));
jest.mock("../../../components/actions/notes", () => ({
  startNewNotes: jest.fn(),
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
//store.dispatch = jest.fn();// en este test tenemos ke kitar el trakimg al dispatch del store porke todas las acciones son asincronas
//por lo tanto no necesitamos simular el dispatch
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <Sidebar/>", () => {
  test("debe de mostrarse correctamente el componente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de disparar la action  de startLogout ", () => {
    wrapper.find("button").prop("onClick")();

    expect(startLogout).toHaveBeenCalled();
  });
  test("debe de disparar la action  de startNewNotes ", () => {
    wrapper.find(".journal__new-entry").prop("onClick")();

    expect(startNewNotes).toHaveBeenCalled();
  });
});
