import * as TYPES from "../actions/actionTypes";

const defaultState = {
  authenticated: false,
  isLoading: false,
  user: {}
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
