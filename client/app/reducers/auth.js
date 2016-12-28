export function auth (state={}, action) {
	switch(action.type) {
		case 'SET_USER': 
			return Object.assign({}, state, action.user.user, {isAuthenticated: !!(action.user)});
		default :
			return state;
	}	
	return state;
}