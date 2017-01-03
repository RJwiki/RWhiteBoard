import i18n from '../i18n' 
import { SET_MENU, SET_BOARD_ITEMS, ERROR } from '../actions/mainmenu'

export const INITIAL_STATE = {
    title: i18n.appName,
    items: [
        { text: i18n.home, allowAccessWithoutLogin: true, url: '/' },
        { text: i18n.addBoard, url: '/addBoard' },
        { text: i18n.whiteBoard, url: '/', items:[
                { text: 'チケット', url: '/boards/test1' },
                { text: '座席表', url: '/boards/test2' },
                { text: '選考', url: '/boards/test3' }
                /*{ text: i18n.improvement, url: '/improvement' },
                { text: i18n.story, url: '/story' },
                { text: i18n.task, url: '/task' }*/
            ]  
        }
    ]
};


export default function mainmenu(state = INITIAL_STATE, action) {

    if(action.type === SET_MENU) {
        return Object.assign({}, action.menu)
    }
    if(action.type === SET_BOARD_ITEMS) {
        const newstate =  {
            title: INITIAL_STATE.title,
            items: [
                INITIAL_STATE.items[0],
                INITIAL_STATE.items[1],
                { text: i18n.whiteBoard, url: '/', items: action.items }
            ]
        };
        return Object.assign({}, newstate)
    }
    return state
}
