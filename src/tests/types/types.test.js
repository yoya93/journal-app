// import React from "react";
// import { mount } from "enzyme";
// import { MemoryRouter, Route, Router } from "react-router-dom";

import "@testing-library/jest-dom";

import { types } from "../../types/types";

describe("Pruebas en los types", () => {
  const typesTest = {
    login: "[Auth] Login",
    logout: "[Auth] Logout",

    uiStartLoading: "[UI] Start loading",
    uiFinishLoading: "[UI] Finish loading",

    uiSetError: "[UI] Set Error",
    uiRemoveError: "[UI] Remove Error",

    notesAddNew: "[Notes] New note",
    notesActive: "[Notes] Set Active note",
    notesLoad: "[Notes] Load notes",
    notesUpdate: "[Notes] Update notes",
    notesFileUrl: "[Notes] Update image url",
    notesDelete: "[Notes] Delete note",
    notesLogoutCleaning: "[Notes] Logout Cleaning",
  };

  test("deben de ser igaules los types que controlan las actions", () => {
    expect(types).toEqual(typesTest);
  });
});
