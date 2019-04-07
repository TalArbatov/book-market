import * as TYPES from "../actions/actionTypes";

const defaultState = {
  authenticated: false,
  isLoading: false,
  user: {}
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.USER_SIGNUP_REQUEST:
    case TYPES.USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case TYPES.USER_SIGNUP_ERROR:
    case TYPES.USER_LOGIN_ERROR:
    case TYPES.USER_SIGNUP_SUCCESS:
      return { ...state, isLoading: false };
    case TYPES.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        user: action.payload.userJWT
      };
    default:
      return state;
  }
};

export default userReducer;
