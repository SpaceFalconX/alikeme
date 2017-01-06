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
		case 'UPDATE_POST':
			return state.map((post) => {
					if(parseInt(post.post_id) !== parseInt(action.updatedPost.post_id)) {
						return post
					}
					return {
						title: action.updatedPost.title,
						content: action.updatedPost.content,
						category: action.updatedPost.category,
						username: action.updatedPost.username,
						user_id: action.updatedPost.user_id,
						post_id: action.updatedPost.post_id
					}
					return post
			})
		case 'DELETE_POST':
			return state.filter((post) => {
				if(parseInt(post.post_id) !== parseInt(action.deletedPost.post_id)) {
					return post
				}
			})
		case 'FETCH_POST':
		  console.log('inside reducer...')
		  return Object.assign({}, state, { posts: action.posts })
		default :
			return state;
	}	
	return state;
}

