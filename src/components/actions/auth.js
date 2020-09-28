import { types } from "../../types/types";
import { firebase, googleAuthProvider } from "../../firebase/firebase-config";

export const startLoginEmailPassword = (email, passsword) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, passsword)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        console.log(error.message);
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
      .catch((e) => {
        console.log(e);
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
