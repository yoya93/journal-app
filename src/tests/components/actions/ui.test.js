import {
  setError,
  removeError,
  startLoading,
  finishLoading,
} from "../../../components/actions/ui";
import { types } from "../../../types/types";

describe("Pruebas ui-actions", () => {
  test("stodas la actions deberian funcionar", () => {
    const action = setError("Help!!!");

    expect(action).toEqual({
      type: types.uiSetError,
      payload: "Help!!!",
    });
  });
});

const removeErrorAction = removeError();
const startLoadingAction = startLoading();
const finishLoadingAction = finishLoading();

expect(removeErrorAction).toEqual({
  type: types.uiRemoveError,
  payload: null,
});

expect(startLoadingAction).toEqual({
  type: types.uiStartLoading,
  payload: true,
});

expect(finishLoadingAction).toEqual({
  type: types.uiFinishLoading,
  payload: false,
});
