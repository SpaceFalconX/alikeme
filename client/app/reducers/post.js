export function userPosts (state=[], action) {
	console.log(state)
	switch(action.type) {
		case 'CREATE_NEW_POST': 
			return [
				...state, {
					content: action.newPost.content,
					author: action.newPost.username,
					author_id: action.newPost.user_id
				}
			]
		default :
			return state;
	}	
	return state;
}

