import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken.js'
import jwt from 'jsonwebtoken'

export function setUser (user) {
	return {
		type: 'SET_USER',
		user
	}
}

export function logoutClick (user) {
	return function (dispatch) {
		delete localStorage.token;
		user = {};
		dispatch(setUser(user));
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
