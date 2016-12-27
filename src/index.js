
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import _ from 'lodash'
  	
import reducers from './reducers'

import RWhiteBoard from './containers/RWhiteBoard'

const store = createStore(reducers);
/*
(function () {
	console.log('reducers');
  	console.log(reducers);
  	console.log(store);
})();*/

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)



function getBaseUrl() {
	var re = new RegExp(/^.*\//);
	return ""+re.exec(window.location.pathname);
}

let BASE_URL = getBaseUrl();
if (_.endsWith(BASE_URL,'/')) BASE_URL = BASE_URL.substring(0, BASE_URL.length - 1); //remove ending '/'



ReactDOM.render(
	<Provider store={store}>
		<Router history={ history }>
			<Route path={ BASE_URL +  "/" } component={ RWhiteBoard } />
			<Route path="*" component={ RWhiteBoard } />
		</Router>
	</Provider>
, document.getElementById("main"));



