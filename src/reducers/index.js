
import board from './board.js';
import mainmenu from './mainmenu';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    board, mainmenu, 
    form: formReducer,
    // Add the reducer to your store on the `routing` key
    routing: routerReducer
  })