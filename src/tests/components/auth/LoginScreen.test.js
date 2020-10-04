import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; // simulo que estoy dentro de una router para ke se pueda usar el link

import { LoginScreen } from "../../../components/auth/LoginScreen";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../components/actions/auth";
startLoginEmailPassword;
const middlewares = [thunk];

jest.mock("../../../components/actions/auth", () => ({
  // se le hace un tranking a la func para saber si es disparada en el component
  // pero como se llamam dentro de un dispatcher es necesario seguir tambien al store.dispatcher
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

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
    jest.clearAllMocks();
  });
  test("debe de mostrarse correctamente el componente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de disparar la action  startGoogleLogin ", () => {
    wrapper.find(".btn-text").prop("onClick")();

    expect(startGoogleLogin).toBeCalled();
  });

  test("debe de disparar la action  startLoginEmailPassword ", () => {
    const e = {
      preventDefault: () => {},
    };
    wrapper.find("form").prop("onSubmit")(e);

    expect(startLoginEmailPassword).toHaveBeenLastCalledWith(
      "yoya@espainosa.com",
      "123456"
    );
  });
});
