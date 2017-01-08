import { PATH_BOARD_LIST } from '../firebase/path'
import { Db, dbControl } from '../firebase/'

export const SET_LIST = 'LT_SET_LIST'
export const ERROR = 'LT_ERROR'

/*
 * action creators
 */

function loadListSuccess(snapshot){ 
  return { 
    type: SET_LIST, 
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
export function loadList() { 
  return dispatch => { 
    const ref = Db.ref(PATH_BOARD_LIST);
    ref.off() 
    ref.on('value', 
      (snapshot) => {dispatch(loadListSuccess(snapshot))}, 
      (error) => {dispatch(showError(error))} 
     ) 
   }
}