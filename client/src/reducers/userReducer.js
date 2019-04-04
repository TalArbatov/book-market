import * as TYPES from "../actions/actionTypes";

const defaultState = {
  authenticated: false,
  isLoading: false,
  user: {}
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.USER_SIGNUP_REQUEST:
      return {...state, isLoading: true}
    case TYPES.USER_SIGNUP_ERROR:
    case TYPES.USER_SIGNUP_SUCCESS:
      return {...state, isLoading: false}
    default:
      return state;
  }
};

export default userReducer;
