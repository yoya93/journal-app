//  {
//      notes : [],
//      active: null ,
//      active:{
//          id: "jflsejfunweofsdjfsdf",
//          title : "",
//          body: "" ,
//          imageUrl: "",
//          date: 123456,
//      }

import { types } from "../types/types";

//  }

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    case types.notesAddNew:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };

    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            return action.payload;
          } else {
            return note;
          }
        }),
      };

    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case types.notesLogoutCleaning:
      return {
        ...state,
        active: null,
        notes: [],
      };

    default:
      return state;
  }
};
