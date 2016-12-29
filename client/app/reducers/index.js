import {combineReducers} from 'redux';
import {user, preferences} from './user.js'
import {auth} from './auth.js'
import {routerReducer} from 'react-router-redux';

const reducer = combineReducers({
	user: auth,
	routing: routerReducer
})

export default reducer;