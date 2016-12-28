import {createStore, applyMiddleware, compose} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from './reducers/index.js'

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
const enhancers = compose(
	middleware,
	window.devToolsExtension? 
	window.devToolsExtension() : f => f
)


const store = createStore(reducer, defaultState, enhancers);

store.subscribe(() => {
	console.log("Store current state", store.getState())
})

export const history = syncHistoryWithStore(browserHistory, store)

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;