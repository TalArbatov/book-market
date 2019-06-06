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
  return dispatch => {
    //add token to localStorage
  localStorage.token = token;
  setAuthorizationToken(token);
  console.log("inside loginSuccess action: next line");
  console.log("token: " + token);
  const user = require('jsonwebtoken').decode(token);
  dispatch(userLoginSuccessFinal())
  dispatch(fetchUser(user._id))

  // dispatch(() => { return {
  //   type: TYPES.USER_LOGIN_SUCCESS,
  //   // payload: {
  //   //   userJWT: require("jsonwebtoken").decode(token)
  //   // }
  // }});
  
  }
 
};

export const userLoginSuccessFinal = () => {
  return {
    type: TYPES.USER_LOGIN_SUCCESS
  }
}
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
        localStorage.token = undefined;
        //setAuthorizationToken(null);

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

export const fetchUser = (_id) => {
  return dispatch => {
    dispatch(fetchUserRequest());
    axios.get('/api/account/fetchUser/' + _id).then(res => {
      //console.log(res.data);
      dispatch(fetchUserSuccess(res.data))
    }).catch(err => {
      console.warn(err);
      dispatch(fetchUserError())
    })
  }
}

export const fetchUserSuccess = (user) => {
  return {
    type: TYPES.FETCH_USER_SUCCESS,
    payload: user
  }
}
export const fetchUserError = () => {
  return {
    type: TYPES.FETCH_USER_ERROR,
  }
}
export const fetchUserRequest = () => {
  return {
    type: TYPES.FETCH_USER_REQUEST,
  }
}

export const uploadUserImage = (file) => {
  return (dispatch) =>  {
    // return axios.post("/api/account/uploadPhoto", formData).then(res => {
    //   console.log(res.data);
    //   const userID = require('jsonwebtoken').decode(localStorage.token)._id;
    //   dispatch(fetchUser(userID));
    // });
    const userID = require('jsonwebtoken').decode(localStorage.token)._id;
    delete axios.defaults.headers.common["Authorization"]

    axios.get('/api/upload/' + userID).then(res => {
      const {url, key} = res.data;
      //temp delete axios auth header before request to amazon
      console.log(file.type)
      axios.put(url, file, {
        headers: {
        // ContentType: file.type,
         'Content-Type': file.type,
         //'Referrer-Policy':'unsafe-url'
        }
      }).then(res => {
        setAuthorizationToken(localStorage.token);
        axios.post('/api/account/uploadPhotoNew', {imageUrl: key, userID}).then(res => {
          console.log(res.data)
        })
        console.log(res.data)
      }) 
    })
    
    return {success: true}
  }
}

export const discardUserImage = (formData) => {
  return (dispatch) => {
    const userID = require('jsonwebtoken').decode(localStorage.token)._id;

    return axios.get("/api/account/discardUserImage/" + userID).then(res => {
      const userID = require('jsonwebtoken').decode(localStorage.token)._id;
      dispatch(fetchUser(userID));

    });
  }
}
