import { actionTypesRedux } from "../reducers/actionTypesRedux";

import postsMockup from "data-mockup/posts-mockup";

export const setPosts = (posts) => (dispatch) => {
  dispatch({
    type: actionTypesRedux.SET_POSTS,
    payload: { posts },
  });
};

export const addPostToColumn = (column, postId) => (dispatch) => {
  dispatch({
    type: actionTypesRedux.ADD_POST_TO_COLUMN,
    payload: {
      postId,
      column,
    },
  });
};

export const removePostFromColumn = (postId) => (dispatch) => {
  dispatch({
    type: actionTypesRedux.REMOVE_POST_FROM_COLUMN,
    payload: {
      postId,
    },
  });
};

export const searchPosts = (posts) => (dispatch) => {
  dispatch({
    type: actionTypesRedux.SEARCH_POSTS,
    payload: {
      posts,
    },
  });
};

export const addComment = (post, postId) => (dispatch) => {
  dispatch({
    type: actionTypesRedux.ADD_COMMENT,
    payload: {
      post,
      postId,
    },
  });
};

export const addReply = (value, postId, commentId) => (dispatch) => {
  let comment = postsMockup
    .find((el) => el.id === postId)
    .comments.find((el) => el.id === commentId);
  comment.reply = value;
  dispatch({
    type: actionTypesRedux.ADD_REPLY,
    payload: {
      comment,
      postId,
    },
  });
};

export const postsPerPageChanger = (count) => (dispatch) => {
  dispatch({
    type: actionTypesRedux.CHANGE_POSTS_PER_PAGE,
    payload: { count },
  });
};

export const pageChanger = (page) => (dispatch) => {
  dispatch({
    type: actionTypesRedux.CHANGE_PAGE,
    payload: { page },
  });
};
