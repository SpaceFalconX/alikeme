import {SHOW_FOLLOWERS, SHOW_FOLLOWING, SET_USER} from '../actions/index.js'

export function auth (state={}, action) {
	switch(action.type) {
		case SET_USER:
			return Object.assign(
				{}, state.user, action.user,
				{ isAuthenticated: !!Object.keys(action.user).length }
			);
		case SHOW_FOLLOWING:
			//console.log("SHOW_FOLLOWING", action)
			return Object.assign(
				{}, state, state.user,
				{ followers: action.following}
			);
		case SHOW_FOLLOWERS:
			return Object.assign(
				{}, state, state.user,
				{ following: action.followers }
			);
		default :
			return state;
	}
	return state;
}

