/*
 * action types
 */

export const SET_LOGGED_IN = 'GOOGLEINFO_SET_LOGGED_IN'
export const SET_USER_INFO = 'GOOGLEINFO_SET_USER_INFO'
export const SET_DISABLE = 'GOOGLEINFO_SET_DISABLE'

/*
 * other constants
 */

export const INITIAL_STATE = {
  loginDisabled: false, 
  loggedIn: false, 
  uid: '',
  displayName: '', 
  email: '', 
  photoURL: ''
}


/*
 * action creators
 */

export function setLoggedIn(isLoggedIn) {
  return { type: SET_LOGGED_IN, loggedIn: isLoggedIn }
}

export function setUserInfo(userInfo) {
  return { type: SET_USER_INFO, userInfo: userInfo }
}

export function setDisable(isDisabled) {
  return { type: SET_DISABLE, loginDisabled: isDisabled }
}