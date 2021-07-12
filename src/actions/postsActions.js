import { actionTypesRedux } from "../reducers/actionTypesRedux";

import postsMockup from "data-mockup/posts-mockup";

let posts = postsMockup;

export const setCurrentPosts = (page, postsPerPage) => (dispatch) => {
  let posts = postsMockup.slice((page - 1) * postsPerPage, page * postsPerPage);
  dispatch({
    type: actionTypesRedux.SET_CURRENT_POSTS,
    payload: { posts },
  });
};

export const ratingSorter = (column, direction) => (dispatch) => {
  dispatch({
    type:actionTypesRedux.RATING_SORT,
    payload:{
      column,
      direction
    }
  })
}

export const addPostToColumn = (column) => (dispatch) => {
  let postRev = posts.slice().reverse();
  let postToAdd = postRev.find((el) => {
    if (!el.added) {
      return el;
    }
  });

  if (!postToAdd) {
    console.log("No more posts to add");
    return;
  }

  posts.forEach((el) => {
        if (el.id === postToAdd.id) {
          el.added = true;
        }
        return el;
      });

  dispatch({
    type: actionTypesRedux.ADD_POST_TO_COLUMN,
    payload: {
      postToAdd,
      column,
    },
  });
};

export const searchPosts = (value) => (dispatch) => {
  let posts = postsMockup.filter((el) => {
    if (el.body.includes(value) || el.title.includes(value)) {
      return el;
    }
    el.comments.map((el) => {
      if (el.body.includes(value)) return el;
    });
  });
  dispatch({
    type: actionTypesRedux.SEARCH_POSTS,
    payload: {
      posts,
    },
  });
};

export const addComment = (value, postId) => (dispatch) => {
  let post = postsMockup.find((el) => el.id === postId);
  post.comments.push({
    body: value,
    reply: "",
    id: post.comments.length,
    rating: Math.random() * 5,
  });
  dispatch({
    type: actionTypesRedux.ADD_COMMENT,
    payload: {
      post,
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
