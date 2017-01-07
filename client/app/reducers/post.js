import {CREATE_NEW_POST, UPDATE_POST, DELETE_POST, FETCH_ALL_POSTS, FETCH_USER_POSTS} from '../actions/index.js'
const initialState = [{}];
export function createNewPost (newPost) {
	const { user_id, username, category, id,
					content, title, category_id, tags,
					created_at, updated_at} = newPost;
	return {
    title: title,
    created_at: created_at,
    updated_at: updated_at,
    content: content,
    id: id,
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
}

export function posts (state=initialState, action) {
	// console.log(`STATE:${state}, ACTION:${action.type}`)
	switch(action.type) {
		case CREATE_NEW_POST:
			return [...state, createNewPost(action.newPost)]
		case FETCH_USER_POSTS:
		  return action.fetchedUserPosts;
		case FETCH_ALL_POSTS:
		  return action.fetchedPosts;
		default :
			return state;
	}
}
