import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken.js'
import jwt from 'jsonwebtoken'

export function signupUser (user) {
	return {
		type: 'SIGNUP_USER',
		user
	} 
}

export function loginUser (user) {
	return {
		type: 'LOGIN_USER',
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
			dispatch(signupUser(userData))
		})
	}
} 

export function loginApiRequest (userData) {
	return function (dispatch) {
		return axios.post('/auth/login', userData)
		.then((resp) => { 
			const {token} = resp.data
			localStorage.setItem('token', token)
			setAuthorizationToken(token)
			console.log(jwt.decode(token))
			dispatch(loginUser(userData))
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