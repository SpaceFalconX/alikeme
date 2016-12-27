import {createStore, applyMiddleware} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
// import redux-thunk, logger, axios, etc
import reducer from './reducers/user.js'

const defaultState = {
	user: {
		username: '',
		email: 'aha',
		password: '',
		isLoggedIn: false,
	},
	preferences: {
		coffee: false,
		founder: false,
		developer: false,
		clubbing: false,
		concerts: false,
		dating: false
	}
}
const middleware = applyMiddleware(thunk, logger());
export const store = createStore(reducer, defaultState, middleware);

store.subscribe(() => {
	console.log("Store current state", store.getState())
})

export const history = syncHistoryWithStore(browserHistory, store)

