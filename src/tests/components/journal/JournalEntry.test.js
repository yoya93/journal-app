import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; // simulo que estoy dentro de una router para ke se pueda usar el link

import { startLogout } from "../../../components/actions/auth";

import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNotes } from "../../../components/actions/notes";

const middlewares = [thunk];

const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
  id: 10,
  title: "test",
  body: "testing",
  imageUrl: "https://hwudh/hhf.png",
  date: 77538248,
};
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <JournalEntry {...note} />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <JournalEntry/>", () => {
  test("debe de mostrarse correctamente el componente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de activar la nota", () => {
    wrapper.find(".journal__entry").prop("onClick")();

    expect(store.dispatch).toHaveBeenCalledWith(activeNotes(note.id, note));
  });
});
