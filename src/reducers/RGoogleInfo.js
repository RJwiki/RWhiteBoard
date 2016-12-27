import { INITIAL_STATE, SET_LOGGED_IN, SET_USER_INFO, SET_DISABLE } from '../actions/RGoogleInfo'

/*
export const INITIAL_STATE = {
  loginDisabled: false, 
  loggedIn: false, 
  uid: '',
  displayName: '', 
  email: '', 
  photoURL: ''
}
*/

export default function RGoogleInfo(state = INITIAL_STATE, action) {

  if(action.type === SET_LOGGED_IN) {
    return Object.assign({}, state, {
        loggedIn: action.loggedIn
      })
  }
  else if(action.type === SET_USER_INFO) {
    return Object.assign({}, state, {
        uid: action.userInfo.uid,
        displayName: action.userInfo.displayName,
        email: action.userInfo.email,
        photoURL: action.userInfo.photoURL
      })
  }  
  else if(action.type === SET_DISABLE) {
    return Object.assign({}, state, {
        loginDisabled: action.loginDisabled
      })
  }
  return state
}