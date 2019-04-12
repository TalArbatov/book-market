import * as TYPES from "../actions/actionTypes";

const defaultState = {
  authenticated: false,
  isLoading: false,
  user: {
    profileImage: {
      filename: 'default.jpg'
    }
  },
//  userImage: 'default.js'
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.USER_SIGNUP_REQUEST:
    case TYPES.USER_LOGIN_REQUEST:
    case TYPES.FETCH_USER_REQUEST:
      return { ...state, isLoading: true };
    case TYPES.USER_SIGNUP_ERROR:
    case TYPES.USER_LOGIN_ERROR:
    case TYPES.FETCH_USER_ERROR:
    case TYPES.USER_SIGNUP_SUCCESS:
      return { ...state, isLoading: false };
    case TYPES.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        //user: action.payload.userJWT
      };
    case TYPES.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        user: defaultState.user
      }
    case TYPES.FETCH_USER_SUCCESS:
      return {...state, user: action.payload}
    // case TYPES.DISCARD_USER_IMAGE_SUCCESS:
    //   return {...state, user: {...state.user, profileImage: defaultState.user.profileImage}}
    default:
      return state;
  }
};

export default userReducer;
