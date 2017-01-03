/*
 * action types
 */

import { Db, dbControl } from '../firebase/'
import { PATH_ROOT, PATH_CONFIG, PATH_ROWS, PATH_COLUMNS, PATH_ITEMS, PATH_BOARD, PATH_CONTAINER, PATH_BOARDS } from '../firebase/path'

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

/*
 * other constants
 */


/*
 * action creators
 */

let currentBoard = '/boards/empty';

export function setCurrentBoard(name){
    currentBoard = PATH_BOARDS + '/' + name;
}


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
export function loadBoard(name) { 
  return dispatch => { 
    const prevRef = Db.ref(currentBoard);
    prevRef.off() 
    setCurrentBoard(name);
    const ref = Db.ref(currentBoard);
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
    if (from.colId && from.rowId) dbControl.deleteItem(currentBoard + PATH_BOARD, from.rowId + '/' + from.colId + '/' + itemId);
    else if (from.container) dbControl.deleteItem(currentBoard + PATH_CONTAINER + '/' + from.container + '/items/', itemId);

    if (to.colId && to.rowId) dbControl.addItem(currentBoard + PATH_BOARD, to.rowId + '/' + to.colId + '/' + itemId, 1);
    else if (to.container) dbControl.addItem(currentBoard + PATH_CONTAINER + '/' + to.container + '/items/', itemId, 1);
}

export function deleteItem(data) {
    const { from, itemId } = data;
    //Remove from board / containers
    if (from) {
      if (from.colId && from.rowId) dbControl.deleteItem(currentBoard + PATH_BOARD, from.rowId + '/' + from.colId + '/' + itemId);
      else if (from.container) dbControl.deleteItem(currentBoard + PATH_CONTAINER + '/' + from.container + '/items/', itemId);
    }
    //Remove from items
    if (itemId) {
        dbControl.deleteItem(currentBoard + PATH_ITEMS, itemId);
    }
}

export function updateItem(data) {
    const { itemId } = data;
    if (itemId) dbControl.updateItem(currentBoard + PATH_ITEMS, itemId, data);
}

export function updateRow(data) {
    const { rowId } = data;
    if (rowId) dbControl.updateItem(currentBoard + PATH_ROWS, rowId, data);
}

export function updateColumn(data) {
    const { colId } = data;
    if (colId) dbControl.updateItem(currentBoard + PATH_COLUMNS, colId, data);
}

export function addItem(container, type) {
    const itemId = dbControl.createID(currentBoard + PATH_ITEMS);
    if (itemId && container) {
      dbControl.addItem(currentBoard + PATH_ITEMS, itemId, { name: '', type: type });
      dbControl.addItem(currentBoard + PATH_CONTAINER + '/' + container + '/items/', itemId, 1);
    }
}

export function addRow() {
    const rowId = dbControl.createID(currentBoard + PATH_ROWS);
    if (rowId) dbControl.addItem(currentBoard + PATH_ROWS, rowId, { name: '' });
}

export function addColumn() {
    const colId = dbControl.createID(currentBoard + PATH_COLUMNS);
    if (colId) dbControl.addItem(currentBoard + PATH_COLUMNS, colId, { name: '' });
}
