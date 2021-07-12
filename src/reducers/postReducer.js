import { actionTypesRedux } from "./actionTypesRedux.js";
import ratingSorter from "utils/ratingSorter.js";

const reducer = (state = null, action) => {
  switch (action.type) {
    case actionTypesRedux.SET_CURRENT_POSTS:
      console.log(action);
      console.log("State :", state);
      return [action.payload.posts, state[1], state[2]];

    case actionTypesRedux.ADD_POST_TO_COLUMN:
      console.log(action);
      console.log("State :", state);
      let colPosts = state[action.payload.column];
      colPosts.posts.push(action.payload.postToAdd);
      if (action.payload.column === 1) return [state[0], colPosts, state[2]];
      return [state[0], state[1], colPosts];

    case actionTypesRedux.RATING_SORT:
      console.log(action);
      console.log("State :", state);
      let sortPosts = state[action.payload.column].posts;
      let ratings = sortPosts.map((el) => {
        let average = 0;

        el.comments.forEach((el) => {
          average += el.rating;
        });

        return (average / el.comments.length).toFixed(2);
      });

      let arrOfObj = ratings;

      for (let i = 0; i < ratings.length; i++) {
        arrOfObj[i] = { ratingAverage: ratings[i] };
      }

      if (!action.payload.sortDir) {
        arrOfObj.sort((a, b) => {
          if (a.ratingAverage > b.ratingAverage) {
            return -1;
          } else if (a.ratingAverage < b.ratingAverage) {
            return 1;
          }
          return 0;
        });
      }

      arrOfObj.sort((a, b) => {
        if (a.ratingAverage > b.ratingAverage) {
          return 1;
        } else if (a.ratingAverage < b.ratingAverage) {
          return -1;
        }
        return 0;
      });

      if (action.payload.column === 1) return [state[0], {...state[1], columnPosts:arrOfObj}, state[2]];
      return [state[0], state[1], {...state[1], columnPosts:arrOfObj}];

    case actionTypesRedux.SEARCH_POSTS:
      console.log(action);
      console.log("State :", state);
      return [action.payload.posts, state[1], state[2]];

    case actionTypesRedux.ADD_COMMENT:
      console.log(action);
      console.log("State :", state);
      let posts = state[0].map((el) => {
        if (el.id === action.payload.post.id) return action.payload.post;
        return el;
      });
      return [posts, state[1], state[2]];

    case actionTypesRedux.ADD_REPLY:
      console.log(action);
      console.log("State:", state);
      let newPosts = state[0].map((el) => {
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
      console.log("Posts with reply :", newPosts);
      console.log(state[1]);
      return [newPosts, state[1], state[2]];

    default:
      return state;
  }
};

export default reducer;
