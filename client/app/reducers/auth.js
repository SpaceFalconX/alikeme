import {SHOW_FOLLOWERS, SHOW_FOLLOWING, FOLLOW_USER, SET_USER, UPDATE_STARRED_POSTS} from '../actions/index.js'

function addToFollowingList (state={}, action) {
	switch(action.type) {
		case FOLLOW_USER:
			return [...state, action.obj]
		default :
			return state;
	}
	return state;
}

const INITIAL_STATE = {
	username: "",
	id: "",
	email:"",
	city: "",
	gravatar: "https://s.gravatar.com/avatar/bbc60d30eec8bbd1a372278140513269?s=100&r=x&d=retro",
	twitterLink: null,
	openness: 0,
	conscientiousness: 0,
	extraversion: 0,
	agreeableness: 0,
	emotionalRange: 0,
	isAuthenticated: false,
	followers: [],
	following: [],
}

export function auth (state={}, action) {
	switch(action.type) {
		case SET_USER:
			return Object.assign(
				{}, state, action.user,
				{ isAuthenticated: !!Object.keys(action.user).length }
			);
		case FOLLOW_USER:
			return Object.assign(
				{}, state,
				{ following: addToFollowingList(state.following, action) }
			);
		case SHOW_FOLLOWING:
			return Object.assign(
				{}, state,
				{ following: action.following }
			);
		case SHOW_FOLLOWERS:
			return Object.assign(
				{}, state,
				{ followers: action.followers }
			);
		default :
			return state;
	}
	return state;
}
