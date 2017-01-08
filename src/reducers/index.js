
import board from './board';
import mainmenu from './mainmenu';
import list from './list';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    board, mainmenu, list,
    form: formReducer,
    // Add the reducer to your store on the `routing` key
    routing: routerReducer
  })