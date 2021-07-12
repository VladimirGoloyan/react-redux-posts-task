import { actionTypesRedux } from "./actionTypesRedux.js";

const reducer = (state = null, action) => {
  switch (action.type) {
    case actionTypesRedux.CHANGE_PAGE:
      console.log(action);
      return { ...state, currentPage: action.payload.page };

      case actionTypesRedux.CHANGE_POSTS_PER_PAGE:
        console.log(action);
        return { ...state, postsPerPage: action.payload.count }; 
         

    default:
      return state;
  }
};

export default reducer;
