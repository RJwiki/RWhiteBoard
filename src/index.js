
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import _ from 'lodash'
  	
import reducers from './reducers'
import main from './containers/main'
import addBoard from './containers/addBoard'

import NavBar from './components/NavBar'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk)
)

const history = syncHistoryWithStore(browserHistory, store)



function getBaseUrl() {
	var re = new RegExp(/^.*\//);
	return ""+re.exec(window.location.pathname);
}

let BASE_URL = getBaseUrl();
if (_.endsWith(BASE_URL,'/')) BASE_URL = BASE_URL.substring(0, BASE_URL.length - 1); //remove ending '/'



ReactDOM.render(
	<Provider store={store}>
		<div>
		<Router history={ history }>
			<Route path={ BASE_URL +  "/" } component={ main } />
			<Route path={ BASE_URL +  "/addBoard" } component={ addBoard } />
			<Route path="*" component={ main } />
		</Router>
		</div>
	</Provider>
, document.getElementById("main"));



