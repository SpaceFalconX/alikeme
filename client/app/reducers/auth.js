import {SHOW_FOLLOWERS, SHOW_FOLLOWING, FOLLOW_USER, SET_USER} from '../actions/index.js'

function addToFollowingList (state={}, action) {
	switch(action.type) {
		case FOLLOW_USER:
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
				{ isAuthenticated: !!Object.keys(action.user).length },
				{ followers: []},
				{ following: []}
			);

		case FOLLOW_USER:
			return Object.assign(
				{}, state, state.user,
				{ following: addToFollowingList(state.following, action) }
			);
		case SHOW_FOLLOWING:
			return Object.assign(
				{}, state, state.user,
				{ following: action.following}
			);
		case SHOW_FOLLOWERS:
			return Object.assign(
				{}, state, state.user,
				{ followers: action.followers }
			);
		default :
			return state;
	}
	return state;
}

