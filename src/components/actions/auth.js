import Swal from "sweetalert2";

import { types } from "../../types/types";
import { firebase, googleAuthProvider } from "../../firebase/firebase-config";
import { startLoading, finishLoading } from "./ui";
import { logoutNotes } from "./notes";

export const startLoginEmailPassword = (email, passsword) => {
  return (dispatch) => {
    dispatch(startLoading());
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, passsword)
      .then(({ user }) => {
        dispatch(finishLoading());

        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(finishLoading());
        Swal.fire("Error", error.message, "error");
      });
  };
};

export const startGoogleLogin = (email, passsword) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, passsword, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, passsword)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", error.message, "error");
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
    dispatch(logoutNotes());
  };
};

export const logout = () => ({
  type: types.logout,
});
