export function auth (state={}, action) {
	console.log(action)
	switch(action.type) {
		case 'SET_USER':
			return Object.assign(
				{}, state.user, action.user,
				{ isAuthenticated: !!Object.keys(action.user).length }
			);
		default :
			return state;
	}
	return state;
}

