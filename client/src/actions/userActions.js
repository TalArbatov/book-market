import * as TYPES from "./actionTypes";
import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
export const login = form => {
  return dispatch => {
    dispatch(loginRequest());
    return axios
      .post("/api/auth/login", form)
      .then(res => {
        console.log(res.data);
        console.log(res.status);

        //authorized
        dispatch(loginSuccess(res.data.token));
        return { success: true };
      })
      .catch(res => {
        //unauthorized
        dispatch(loginError());
        return { success: false };
      });
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
export const loginSuccess = token => {
  //add token to localStorage
  localStorage.token = token;
  setAuthorizationToken(token);
  console.log("inside loginSuccess action: next line");
  console.log("token: " + token);
  return {
    type: TYPES.USER_LOGIN_SUCCESS,
    payload: {
      userJWT: require("jsonwebtoken").decode(token)
    }
  };
};
export const signup = form => {
  return dispatch => {
    console.log(form);
    dispatch(signupRequest());
    return axios.post("/api/auth/signup", form).then(res => {
      console.log(res.data);
      if (res.data.success) {
        dispatch(signupSuccess());
        dispatch(loginSuccess(res.data.token));
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

export const logout = () => {
  return dispatch => {
    dispatch(logoutRequest());
    return axios.get("/api/auth/logout").then(res => {
      if (res.data.success) {
        dispatch(logoutSuccess());
        return { success: true };
      } else {
        dispatch(logoutError());
        return { success: false };
      }
    });
  };
};

export const logoutRequest = () => {
  return {
    type: TYPES.USER_LOGOUT_REQUEST
  };
};
export const logoutError = () => {
  return {
    type: TYPES.USER_LOGOUT_ERROR
  };
};
export const logoutSuccess = () => {
  return {
    type: TYPES.USER_LOGOUT_SUCCESS
  };
};

