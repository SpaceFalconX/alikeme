export function userPosts (state=[], action) {
	//todo -> set state default to seed js
	// change params
	
	switch(action.type) {
		case 'CREATE_NEW_POST':
			return [
				...state, {
					title: action.newPost.title,
					content: action.newPost.content,
					category: action.newPost.category,
					username: action.newPost.username,
					user_id: action.newPost.user_id,
					post_id: Math.random() * 1000000000000000000
				}
			]
		default :
			return state;
	}	
	return state;
}

