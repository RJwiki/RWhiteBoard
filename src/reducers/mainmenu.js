import i18n from '../i18n' 
import { SET_MENU, SET_BOARD_ITEMS, ERROR } from '../actions/mainmenu'

export const INITIAL_STATE = {
    title: i18n.appName,
    items: [
        { text: i18n.home, allowAccessWithoutLogin: true, url: '/' },
        { text: i18n.addBoard, url: '/addBoard' }
    ]
};


export default function mainmenu(state = INITIAL_STATE, action) {

    if(action.type === SET_MENU) {
        return Object.assign({}, action.menu)
    }
    if(action.type === SET_BOARD_ITEMS) {
        let items = [];
        Object.keys(action.items).forEach(function (itemId) {
            items.push({ text: action.items[itemId], url: '/boards/' + itemId });
            
        }, this)

        const newstate =  {
            title: INITIAL_STATE.title,
            items: [
                INITIAL_STATE.items[0],
                INITIAL_STATE.items[1],
                { text: i18n.whiteBoard, url: '/', items: items }
            ]
        };
        return Object.assign({}, newstate)
    }
    return state
}
