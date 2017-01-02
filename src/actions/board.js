/*
 * action types
 */

import { Db, dbControl } from '../firebase/'
import { PATH_ROOT, PATH_CONFIG, PATH_ROWS, PATH_COLUMNS, PATH_ITEMS, PATH_BOARD, PATH_CONTAINER } from '../firebase/path'

export const SET_BOARD = 'BRD_SET_BOARD'
export const SET_MOVE_ITEM = 'BRD_MOVE_ITEM'

export const ADD_ROW = 'BRD_ADD_ROW'
export const REMOVE_ROW = 'BRD_REMOVE_ROW'
export const UPDATE_ROW = 'BRD_UPDATE_ROW'

export const ADD_COLUMN = 'BRD_ADD_COLUMN'
export const REMOVE_COLUMN = 'BRD_REMOVE_COLUMN'
export const UPDATE_COLUMN = 'BRD_UPDATE_COLUMN'

export const ADD_ITEM = 'BRD_ADD_ITEM'
export const REMOVE_ITEM = 'BRD_REMOVE_ITEM'
export const UPDATE_ITEM = 'BRD_UPDATE_ITEM'


export const ERROR = 'BRD_ERROR'

const ref = Db.ref(PATH_ROOT);
/*
 * other constants
 */


/*
 * action creators
 */

function loadBoardSuccess(snapshot){ 
  return { 
    type: SET_BOARD, 
    board: snapshot.val() 
  } 
} 

 
function showError(error){ 
  return { 
    type: ERROR, 
    message: error.message 
  } 
}

// Subscribe 
export function loadBoard() { 
  return dispatch => { 
    ref.off() 
    ref.on('value', 
      (snapshot) => {dispatch(loadBoardSuccess(snapshot))}, 
      (error) => {dispatch(showError(error))} 
     ) 
   }
}


export function setBoard(board) {
    return { type: SET_BOARD, board: board }
}

export function moveItem(data) {
    //return { type: SET_MOVE_ITEM, from: data.from, to: data.to }
    const { from, to, itemId } = data;
    //console.log(data);
    if (from.colId && from.rowId) dbControl.deleteItem(PATH_BOARD, from.rowId + '/' + from.colId + '/' + itemId);
    else if (from.container) dbControl.deleteItem(PATH_CONTAINER + '/' + from.container + '/items/', itemId);

    if (to.colId && to.rowId) dbControl.addItem(PATH_BOARD, to.rowId + '/' + to.colId + '/' + itemId, 1);
    else if (to.container) dbControl.addItem(PATH_CONTAINER + '/' + to.container + '/items/', itemId, 1);
}


export function updateItem(data) {
    const { itemId } = data;
    if (itemId) dbControl.updateItem(PATH_ITEMS, itemId, data);
}
