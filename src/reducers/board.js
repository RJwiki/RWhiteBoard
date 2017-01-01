import { SET_BOARD, ADD_PARTICIPANT, REMOVE_PARTICIPANT, UPDATE_PARTICIPANT, ADD_TICKET, REMOVE_TICKET, UPDATE_TICKET } from '../actions/board'
import { PATH_BOARD, PATH_NOT_ASSIGN, PATH_RELEASED } from '../firebase/path'

export const INITIAL_STATE = {
    "config":{
        "type": 0, 
        "rowFix": 0, 
        "columnFix": 0,
        "rowShowTitle": false,
        "columnShowTitle": false,
        "defaultContainer": "notAssigned"
    },
    "rows": {},
    "columns": {},
    "items":{},
    "board": {},
    "notAssigned": {
        "name": "Not Assigned"
    }
}


export default function board(state = INITIAL_STATE, action) {

    if(action.type === SET_BOARD) {
        return Object.assign({}, action.board)
    }
    /*
    else if(action.type === ADD_PARTICIPANT) {
        let id = store.createID(PATH_BOARD);
        if (id) {
            let newState = {};
            newState[id] = {
                id: id,
                name: '(Please Input Name)',
                hour: 0,
                url: ''
            };
            store.addItem(PATH_BOARD, id, newState[id]);
            return Object.assign({}, state, newState);
        }
    }*/
    else if(action.type === REMOVE_PARTICIPANT) {
        if (action.id) {
            let newState = Object.assign({}, state);
            delete newState[action.id]
            store.deleteItem(PATH_BOARD, action.id);
            return newState;
        }
    }else if(action.type === UPDATE_PARTICIPANT) {
        if (action.id) {
            return Object.assign({}, state, { });
        }
    }

    return state
}
