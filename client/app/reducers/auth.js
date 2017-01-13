import {SHOW_FOLLOWERS, SHOW_FOLLOWING, FOLLOW_USER, SET_USER} from '../actions/index.js'

function addToFollowingList (state={}, action) {
	switch(action.type) {
		case FOLLOW_USER:
			console.log("FOLLOW_USER REDUCER", action.obj, "STATE.FOLLOWING", state.following)
			return [...state, action.obj]
		default :
			return state;
	}
	return state;
}


export function auth (state={}, action) {
	switch(action.type) {
		case SET_USER:
			return Object.assign(
				{}, state.user, action.user,
				{ isAuthenticated: !!Object.keys(action.user).length }
			);

		case FOLLOW_USER:
			console.log("FOLLOW_USER REDUCER", state, action)
			return Object.assign(
				{}, state, state.user,
				{ following: addToFollowingList(state.following, action) }
			);
		case SHOW_FOLLOWING:
			// console.log("SHOW_FOLLOWING REDUCER", action)
			return Object.assign(
				{}, state, state.user,
				{ following: action.following}
			);
		case SHOW_FOLLOWERS:
			console.log("SHOW_FOLLOWERS REDUCER", action)
			return Object.assign(
				{}, state, state.user,
				{ followers: action.followers }
			);
		default :
			return state;
	}
	return state;
}

