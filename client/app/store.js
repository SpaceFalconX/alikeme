import {createStore, applyMiddleware, compose} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from './reducers/index.js'
import setAuthorizationToken from './utils/setAuthorizationToken.js'
import {setUser, getFollowers, getFollowing} from './actions/auth_actions.js'
import {fetchUserPostsFromDb } from './actions/post_actions.js'
import {initUserMatches } from './actions/match_actions.js'
import {fetchCategories} from './actions/category_actions.js'
import {Promise} from 'bluebird'

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
// if(localStorage.token) {
//   setAuthorizationToken(localStorage.token);
//   // const decoded = jwt.decode(localStorage.token)
// }

//Hot reload Redux reducers
if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}


export const history = syncHistoryWithStore(browserHistory, store)

export default store;






