import { SET_LIST } from '../actions/list'

export const INITIAL_STATE = {};

export default function board(state = INITIAL_STATE, action) {
    if(action.type === SET_LIST) {
        return Object.assign({}, state, {list: action.items})
    }
    return state
}
