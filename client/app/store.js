import {createStore, applyMiddleware, compose} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from './reducers/index.js'
import setAuthorizationToken from './utils/setAuthorizationToken.js'

const defaultState = {
	auth: {
		isAuthenticated: !!(localStorage.token)
	},
	user: {
		username: '',
		email: '',
		password: '',
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

const enhancers = compose(
	applyMiddleware(thunk),
	window.devToolsExtension? window.devToolsExtension() : f => f
)

// Store Creation
const store = createStore(reducer, defaultState, enhancers);

// Chekcing and Setting for tokens for every request
setAuthorizationToken(localStorage.token);

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}


export const history = syncHistoryWithStore(browserHistory, store)

export default store;







