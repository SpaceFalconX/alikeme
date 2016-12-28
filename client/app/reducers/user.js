export function user (state={}, action) {
	switch(action.type) {
		case 'SIGNUP_USER':
			return {
				...state,
				...action.user,
				isLoggedIn: true
			}

		default:
			return state;
	}
	return state;
}

export function preferences(state={}, action) {
	switch(action.type) {
		case 'SELECT_PREFERENCES':
			return Object.assign({}, state, action.preferences)
		default:
			return state;
	}
	return state;
}

