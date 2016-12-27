import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'; 

function user (state={}, action) {
	switch(action.type) {
		case 'SIGNUP_USER':
			return {
				...state,
				...action.user,
				isLoggedIn: true
			}

		default:
			return state;
	}
	return state;
}

function preferences(state={}, action) {
	switch(action.type) {
		case 'SELECT_PREFERENCES':
			return Object.assign({}, state, action.preferences)
		default:
			return state;
	}
	return state;
}

const reducer = combineReducers({
	preferences: preferences,
	user: user,
	routing: routerReducer
})

export default reducer;