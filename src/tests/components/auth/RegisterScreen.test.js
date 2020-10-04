import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; // simulo que estoy dentro de una router para ke se pueda usar el link

import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../components/actions/auth";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { types } from "../../../types/types";

const middlewares = [thunk];

// jest.mock("../../../components/actions/auth", () => ({
//   // se le hace un tranking a la func para saber si es disparada en el component
//   // pero como se llamam dentro de un dispatcher es necesario seguir tambien al store.dispatcher
//   startGoogleLogin: jest.fn(),
//   startLoginEmailPassword: jest.fn(),
// }));

const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);
//store.dispatch = jest.fn();// en este test tenemos ke kitar el trakimg al dispatch del store porke todas las acciones son asincronas
//por lo tanto no necesitamos simular el dispatch
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <RegisterScreen/>", () => {
  test("debe de mostrarse correctamente el componente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de disparar la action  de email vacio ", () => {
    const emailField = wrapper.find('input[name="email"]');

    emailField.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });

    const e = {
      preventDefault: () => {},
    };
    wrapper.find("form").prop("onSubmit")(e);
    const action = store.getActions();

    expect(action[0]).toEqual({
      type: types.uiSetError,
      payload: "Email is not valid",
    });
  });

  test("debe de mostrar el msg de email vacio ", () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: "email error",
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
    expect(wrapper.find(".auth__alert-error").text().trim()).toBe(
      initState.ui.msgError
    );
  });
});
