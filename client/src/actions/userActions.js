import * as TYPES from './actionTypes';
import axios from 'axios'

export const signup = (form) => {
  return dispatch => {
    console.log(form)
    dispatch(signupRequest());
    return axios.post('/api/auth/signup', form).then(res => {
      if(res.data.success) {
        dispatch(signupSuccess());
        return {success: true}
      }
      else {
        dispatch(signupError())
        return {success:false, error: res.data.error}
      }
    })
  }
}

export const signupRequest = () => {
  return {
    type: TYPES.USER_SIGNUP_REQUEST
  }
}
export const signupSuccess = () => {
  return {
    type: TYPES.USER_SIGNUP_SUCCESS
  }
}
export const signupError = () => {
  return {
    type: TYPES.USER_SIGNUP_ERROR
  }
}