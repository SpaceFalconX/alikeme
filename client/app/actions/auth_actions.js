import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken.js'
import jwt from 'jsonwebtoken'
import {SET_USER, LOGOUT_USER, FOLLOW_USER, SHOW_FOLLOWERS, SHOW_FOLLOWING, UPDATE_STARRED_POSTS} from './index.js';

export function setUser (user) {
	return {
		type: SET_USER,
		user
	}
}

export function logoutUser () {
	return {
		type: LOGOUT_USER,
	}
}

export function followUser (obj) {
	return {
		type: FOLLOW_USER,
		obj
	}
}

export function followers (followers) {
	return {
		type: SHOW_FOLLOWERS,
		followers
	}
}

export function following (following) {
	return {
		type: SHOW_FOLLOWING,
		following
	}
}


export function logoutClick (user) {
	return function (dispatch) {
		delete localStorage.token;
		dispatch(logoutUser());
	}
}

export function followClick (follower_id, followed_id) {
	return (dispatch) => {
		return axios.post('/api/user/follow', {follower_id, followed_id})
		.then(() => {
			return axios.get(`/api/user/${followed_id}`)
			.then(({data}) => {
				dispatch(followUser({...data, follower_id, followed_id}))
			})
		})
	}
}

export function getFollowers (id) {
	return (dispatch) => {
		return axios.get(`/api/user/followers/${id}`)
		.then((resp) => {
			// console.log("RESP", resp.data)
			dispatch(followers(resp.data))
		})
	}
}

export function getFollowing (id) {
	return (dispatch) => {
		return axios.get(`/api/user/following/${id}`)
		.then((resp) => {
			dispatch(following(resp.data))
		})
	}
}


export function signupApiRequest (userData) {
	return function (dispatch) {
		return axios.post('/auth/signup', userData)
		.then((resp) => {
			var token = resp.data.token;
			localStorage.setItem('token', token);
			setAuthorizationToken(token);
			const data = jwt.decode(token)
			dispatch(setUser(data.user));
		})
		.catch((err) => {
			console.log(err);
		})
	}
}

export function loginApiRequest (userData) {
	return function (dispatch) {
		return axios.post('/auth/login', userData)
		.then((resp) => {
			var token = resp.data.token;
			localStorage.setItem('token', token);
			setAuthorizationToken(token);
			const data = jwt.decode(token)
			dispatch(setUser(data.user));
		})
		.catch((err) => {
			console.log(err);
		})
	}
}
