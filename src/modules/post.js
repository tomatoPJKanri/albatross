import createActionTypes from "../lib/createActionTypes";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "../api/posts";
import { createAction } from "redux-actions";
import { handleActions } from "redux-actions";

const [READ, READ_SUCCESS, READ_FAILURE] = createActionTypes("post/READ");
const UNLOAD_POST = "post/UNLOAD_POST";

export const readPost = createRequestThunk(READ, api.readPost);
export const unloadPost = createAction(UNLOAD_POST);

const init = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => init,
  },
  init
);

export default post;
