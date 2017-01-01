import {createStore, applyMiddleware, compose} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from './reducers/index.js'
import setAuthorizationToken from './utils/setAuthorizationToken.js'
import {setUser} from './actions/actionCreator.js'


/** 
Devtools extension Redux - should be applied as a store enhancer 
not as a middleware. 
*/
const enhancers = compose(
	applyMiddleware(thunk),
	window.devToolsExtension? window.devToolsExtension() : f => f
)

// Store Creation
const store = createStore(reducer, enhancers);

// Chekcing and Setting for tokens for every request
if(localStorage.token) {
	setAuthorizationToken(localStorage.token);
	store.dispatch(setUser(jwt.decode(localStorage.token).user));
}

//Hot reload Redux
if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}


export const history = syncHistoryWithStore(browserHistory, store)

export default store;






