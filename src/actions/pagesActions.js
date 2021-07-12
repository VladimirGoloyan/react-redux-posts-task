import { actionTypesRedux } from "../reducers/actionTypesRedux";

export const pageChanger = (page) => (dispatch) => {
  dispatch({
    type: actionTypesRedux.CHANGE_PAGE,
    payload: { page },
  });
};

export const postsPerPageChanger = (count) => (dispatch) => {
    dispatch({
      type: actionTypesRedux.CHANGE_POSTS_PER_PAGE,
      payload: { count },
    });
  };


