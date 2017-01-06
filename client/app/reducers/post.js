export function posts (state=[], action) {
	switch(action.type) {
		case 'CREATE_NEW_POST':
			const { user_id, username, category,
							content, title, category_id, tags} = action.newPost;
			let newState =   {
		    title: title,
		    created_at: Date.now(),
		    updated_at: Date.now(),
		    content: content,
		    id: 1,
		    user: {
		      username: username,
		      id: user_id
		    },
		    category: {
		      id: category_id,
		      name: category
		    },
		    tags: tags
		  }
			return [...state, newState];
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
					return post;
			})
		case 'DELETE_POST':
			return state.filter((post) => {
				if(parseInt(post.post_id) !== parseInt(action.deletedPost.post_id)) {
					return post
				}
			})
		case 'FETCH_POSTS':
		  console.log('inside reducer...', state, action.fetchedPosts)
		  return [...state, ...action.fetchedPosts]
		default :
			return state;
	}
	return state;
}



