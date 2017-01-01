/*
 * action types
 */
import { Db, dbControl } from '../firebase/'
import { PATH_BOARD, PATH_NOT_ASSIGN, PATH_RELEASED } from '../firebase/path'

export const SET_BOARD = 'BRD_SET_BOARD'
export const ADD_PARTICIPANT = 'BRD_ADD_PARTICIPANT'
export const REMOVE_PARTICIPANT = 'BRD_REMOVE_PARTICIPANT'
export const UPDATE_PARTICIPANT = 'BRD_UPDATE_PARTICIPANT'
export const ADD_TICKET = 'BRD_ADD_TICKET'
export const REMOVE_TICKET = 'BRD_REMOVE_TICKET'
export const UPDATE_TICKET = 'BRD_UPDATE_TICKET'

export const ERROR = 'BRD_ERROR'
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

/*
// CREATE_TASK 
function addTodo(text){ 
  return dispatch => { 
    ref.push({ 
      text: text, 
      completed: false, 
    }) 
    .catch(error => dispatch({ 
      type: 'ADD_TASK_ERROR', 
      message: error.message, 
    })); 
  } 
} 
*/


export function setBoard(board) {
    return { type: SET_BOARD, board: board }
}

export function addParticipant() {
   // return { type: ADD_PARTICIPANT }
        let id = dbControl.createID(PATH_BOARD);
        if (id) {
            const item = {
                id: id,
                name: '(Please Input Name)',
                hour: 0,
                url: ''
            };
            return dispatch => { 
                dbControl.addItem(PATH_BOARD, id, item)
                .catch(error => dispatch(showError(error))); 
            }
        }else {
            return dispatch => { 
                dispatch(showError('Failed to create ID')); 
            }
        }
}

export function removeParticipant(id) {
    return { type: REMOVE_PARTICIPANT, id }
}

export function updateParticipant(id, data) {
    return { type: UPDATE_PARTICIPANT, id, data }
}


export function addTicket() {
    return { type: ADD_TICKET }
}

export function removeTicket(id) {
    return { type: REMOVE_TICKET, id }
}

export function updateTicket(id, data) {
    return { type: UPDATE_TICKET, id, data }
}