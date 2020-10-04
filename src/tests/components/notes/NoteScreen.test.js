import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; // simulo que estoy dentro de una router para ke se pueda usar el link

import { activeNotes } from "../../../components/actions/notes";
import { NoteScreen } from "../../../components/notes/NoteScreen";

const middlewares = [thunk];

jest.mock("../../../components/actions/notes", () => ({
  activeNotes: jest.fn(),
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
      id: "5126516",
      title: "Hola ",
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <NoteScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <NoteScreen/>", () => {
  test("debe de mostrarse correctamente el componente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de disparar la action  de startLogout ", () => {
    const emailField = wrapper.find('input[name="title"]');

    emailField.simulate("change", {
      target: {
        value: "Hola de nuevo",
        name: "title",
      },
    });

    expect(activeNotes).toHaveBeenLastCalledWith("5126516", {
      title: "Hola de nuevo",
      id: "5126516",
    });
  });
});
