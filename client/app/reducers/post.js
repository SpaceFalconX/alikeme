export function userPosts (state=[], action) {
	//todo -> set state default to seed js
	// change params
	
	switch(action.type) {
		case 'CREATE_NEW_POST':
		console.log(action.newPost)
			return [
				...state, {
					title: action.newPost.title,
					content: action.newPost.content,
					category: action.newPost.category,
					username: action.newPost.username,
					user_id: action.newPost.user_id
				}
			]
		default :
			return state;
	}	
	return state;
}

