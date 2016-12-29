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
			console.log('DATA ON SIGNUP:', resp)
			dispatch(setUser(resp.data.user))
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
			console.log(resp)
			var token = resp.data.token;
			localStorage.setItem('token', token);
			setAuthorizationToken(token);
			const data = jwt.decode(token)
			console.log('DATA ON LOGIN:', jwt.decode(token))
			dispatch(setUser(data.user));
		})
		.catch((err) => {
			console.log(err);
		})

	}
} 

// export function preferencesApiRequest (preferenceData, params) {
// 	return function (dispatch) {
// 		return axios.post(`/api/users/pref/${params}`, preferenceData)
// 		.then((resp) => { 
// 			dispatch(selectPreferences(preferenceData))
// 		})
// 	}
// } 


// export function signupUser (user) {
// 	return {
// 		type: 'SIGNUP_USER',
// 		user
// 	} 
// }
// export function selectPreferences (preferences) {
// 	return {
// 		type: 'SELECT_PREFERENCES',
// 		preferences
// 	} 
// }