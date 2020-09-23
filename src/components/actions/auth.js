import { types } from "../../types/types";

export const startLoginEmailPassword = (email, passsword) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(1234, "Yoya"));
    }, 3500);
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
