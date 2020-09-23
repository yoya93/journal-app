import { types } from "../../types/types";
import { firebase, googleAuthProvider } from "../../firebase/firebase-config";

export const startLoginEmailPassword = (email, passsword) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(1234, "Yoya"));
    }, 3500);
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

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
