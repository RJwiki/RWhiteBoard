import { PATH_BOARD_NAMES } from '../firebase/path'

/*
 * action types
 */
export const SET_MENU = 'MN_SET_MENU'
export const SET_BOARD_ITEMS = 'MN_SET_BOARD_ITEMS'
export const ERROR = 'MN_ERROR'

/*
 * other constants
 */


/*
 * action creators
 */

function loadMenuSuccess(snapshot){ 
  return { 
    type: SET_BOARD_ITEMS, 
    items: snapshot.val() 
  } 
} 

 
function showError(error){ 
  return { 
    type: ERROR, 
    message: error.message 
  } 
}

// Subscribe 
export function loadMenu(name) { 
  return dispatch => { 
    const ref = Db.ref(PATH_BOARD_NAMES);
    ref.off() 
    ref.on('value', 
      (snapshot) => {dispatch(loadMenuSuccess(snapshot))}, 
      (error) => {dispatch(showError(error))} 
     ) 
   }
}