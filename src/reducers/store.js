import { combineReducers, createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import postsReducer from "./postReducer";
import pagesReducer from "./pagesReducer";

const reducer = combineReducers({
  posts: postsReducer,
  pages: pagesReducer,
});

const initialState = {
  posts: [[], { posts: [], sortDir: true }, { posts: [], sortDir: true }],
  pages: { currentPage: 1, postsPerPage: 3 },
};

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(reduxThunk)
);
