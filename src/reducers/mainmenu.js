import i18n from '../i18n.js' 

export const INITIAL_STATE = {
    title: i18n.whiteBoard,
    items: [
        { text: i18n.home, allowAccessWithoutLogin: true, url: '/' },
        { text: i18n.whiteBoard, url: '/', items:[
                { text: i18n.improvement, url: '/addOrder' },
                { text: i18n.story, url: '/orderList' },
                { text: i18n.task, url: '/purchaseList' }
            ]  
        }
    ]
};


export default function mainmenu(state = INITIAL_STATE, action) {

    if(action.type === 'SET_MENU') {
        return Object.assign({}, action.menu)
    }

    return state
}
