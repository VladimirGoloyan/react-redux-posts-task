import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import postsReducer from "./postReducer";

const initialState = {
  posts: [],
  currentPage: 1,
  postsPerPage: 3,
};

export const store = createStore(
  postsReducer,
  initialState,
  applyMiddleware(reduxThunk)
);
