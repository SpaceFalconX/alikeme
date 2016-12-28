export function auth (state={}, action) {
	console.log('IS auth', state, action.type, action.user)
	switch(action.type) {
		case 'SET_USER': 
			return Object.assign({}, state, action.user.user, {isAuthenticated: !!(action.user)});
		default :
			return state;
	}	
	return state;
}