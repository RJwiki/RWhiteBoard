/*
 * action types
 */

export const SET_BOARD = 'BRD_SET_BOARD'
export const ADD_PARTICIPANT = 'BRD_ADD_PARTICIPANT'
export const REMOVE_PARTICIPANT = 'BRD_REMOVE_PARTICIPANT'
export const UPDATE_PARTICIPANT = 'BRD_UPDATE_PARTICIPANT'
export const ADD_TICKET = 'BRD_ADD_TICKET'
export const REMOVE_TICKET = 'BRD_REMOVE_TICKET'
export const UPDATE_TICKET = 'BRD_UPDATE_TICKET'
/*
 * other constants
 */


/*
 * action creators
 */

export function setBoard(board) {
    return { type: SET_BOARD, board: board }
}

export function addParticipant() {
    return { type: ADD_PARTICIPANT }
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