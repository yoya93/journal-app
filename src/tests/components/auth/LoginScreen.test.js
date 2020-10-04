import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; // simulo que estoy dentro de una router para ke se pueda usar el link

import { LoginScreen } from "../../../components/auth/LoginScreen";
const middlewares = [thunk];

const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <LoginScreen/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test("debe de render el componente normalmente", () => {
    expect(wrapper).toMatchSnapshot();
  }, 20000);
});
