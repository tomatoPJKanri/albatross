//Action

import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";
import produce from "immer";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "../api/auth";
import createActionTypes from "../lib/createActionTypes";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createActionTypes("auth/LOGIN");
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createActionTypes("auth/REGISTER");

// clientだけで動く物createAction
// req/res Thunkを利用する
// redux-saga
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login
    key, // id, password, passconfirm
    value, // real value
  })
);

export const initForm = createAction(INITIALIZE_FORM, (form) => form);

export const login = createRequestThunk(LOGIN, api.login);
export const register = createRequestThunk(REGISTER, api.register);

//State
const init = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    phone: "",
  },
  login: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
};

//Reducer
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: init[form],
      authError: null,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [REGISTER_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
  },
  init
);

export default auth;
