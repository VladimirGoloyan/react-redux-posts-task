import { actionTypesRedux } from "./actionTypesRedux.js";

const reducer = (state = null, action) => {
  switch (action.type) {
    case actionTypesRedux.SET_POSTS:
      console.log(action);
      return { ...state, posts: action.payload.posts };

    case actionTypesRedux.ADD_POST_TO_COLUMN:
      return {
        ...state,
        posts: state.posts.map((el) => {
          if (el.id === action.payload.postId) {
            if (action.payload.column === 1) return { ...el, selected: "left" };
            return { ...el, selected: "right" };
          }
          return el;
        }),
      };

    case actionTypesRedux.REMOVE_POST_FROM_COLUMN:
      return {
        ...state,
        posts: state.posts.map((el) => {
          if (el.id === action.payload.postId) {
            return { ...el, selected: "" };
          }
          return el;
        }),
      };

    case actionTypesRedux.SEARCH_POSTS:
      return { ...state, posts: action.payload.posts };

    case actionTypesRedux.ADD_COMMENT:
      let posts = state.posts.map((el) => {
        if (el.id === action.payload.postId) return action.payload.post;
        return el;
      });
      return { ...state, posts };

    case actionTypesRedux.ADD_REPLY:
      let newPosts = state.posts.map((el) => {
        if (el.id === action.payload.postId) {
          el.comments.map((el) => {
            if (el.id === action.payload.comment.id) {
              return action.payload.comment;
            }
            return el;
          });
          return el;
        }
        return el;
      });

      return { ...state, posts: newPosts };

    case actionTypesRedux.CHANGE_PAGE:
      return { ...state, currentPage: action.payload.page };

    case actionTypesRedux.CHANGE_POSTS_PER_PAGE:
      return { ...state, postsPerPage: action.payload.count };

    default:
      return state;
  }
};

export default reducer;
