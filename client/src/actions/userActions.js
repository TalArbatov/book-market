import * as TYPES from "./actionTypes";
import axios from "axios";

export const login = form => {
  return dispatch => {
    dispatch(loginRequest());
    return axios.post('/api/auth/login', form).then(res => {
      console.log(res.data);
      if(res.data.success) {
        dispatch(loginSuccess(res.data.payload));
        return {success: true}
      }
      else {
        dispatch(loginError());
        return {success: false}
      }
    })
  };
};

export const loginRequest = () => {
  return {
    type: TYPES.USER_LOGIN_REQUEST
  };
};
export const loginError = () => {
  return {
    type: TYPES.USER_LOGIN_ERROR
  };
};
export const loginSuccess = user => {
  return {
    type: TYPES.USER_LOGIN_SUCCESS,
    payload: user
  };
};
export const signup = form => {
  return dispatch => {
    console.log(form);
    dispatch(signupRequest());
    return axios.post("/api/auth/signup", form).then(res => {
      if (res.data.success) {
        dispatch(signupSuccess());
        return { success: true };
      } else {
        dispatch(signupError());
        return { success: false, error: res.data.error };
      }
    });
  };
};

export const signupRequest = () => {
  return {
    type: TYPES.USER_SIGNUP_REQUEST
  };
};
export const signupSuccess = () => {
  return {
    type: TYPES.USER_SIGNUP_SUCCESS
  };
};
export const signupError = () => {
  return {
    type: TYPES.USER_SIGNUP_ERROR
  };
};
