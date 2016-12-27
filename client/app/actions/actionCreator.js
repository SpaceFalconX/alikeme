import axios from 'axios'

export function signupUser (user) {
	return {
		type: 'SIGNUP_USER',
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

export function preferencesApiRequest (preferenceData, params) {
	console.log("preferenceData", preferenceData)
	return function (dispatch) {
		return axios.post(`/api/users/pref/${params}`, preferenceData)
		.then((resp) => { 
			dispatch(selectPreferences(preferenceData))
		})
	}
} 