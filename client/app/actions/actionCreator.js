import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken.js'
import jwt from 'jsonwebtoken'

export function signupUser (user) {
	return {
		type: 'SIGNUP_USER',
		user
	} 
}

export function setUser (user) {
	return {
		type: 'SET_USER',
		user
	} 
}

export function selectPreferences (preferences) {
	return {
		type: 'SELECT_PREFERENCES',
		preferences
	} 
}


export function signupApiRequest (userData) {
	return function (dispatch) {
		return axios.post('/auth/signup', userData)
		.then((resp) => { 
			console.log(resp.data)
			dispatch(setUser(resp.data))
		})
	}
} 

export function loginApiRequest (userData) {
	return function (dispatch) {
		return axios.post('/auth/login', userData)
		.then((resp) => { 
			var token = resp.data.token;
			localStorage.setItem('token', token);
			console.log(jwt.decode(token))
			setAuthorizationToken(token);
			dispatch(setUser(jwt.decode(token)));
		})
	}
} 

export function preferencesApiRequest (preferenceData, params) {
	console.log("preferenceData", preferenceData)
	return function (dispatch) {
		return axios.post(`/api/users/pref/${params}`, preferenceData)
		.then((resp) => { 
			dispatch(selectPreferences(preferenceData))
		})
	}
} 