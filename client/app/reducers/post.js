import {CREATE_NEW_POST, UPDATE_POST, DELETE_POST, FETCH_ALL_POSTS, FETCH_USER_POSTS, FILTER_POSTS} from '../actions/index.js'
export function createNewPost (newPost) {
  console.log("NEW POST", newPost)
	const { user_id, username, category,category_id, id,
					content, title, tags,
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

export function userPosts (state=[], action) {
	// console.log(`STATE:${state}, ACTION:${action.type},
 //              newPost:${action.newPost}, fetchedUserPosts:${action.fetchedUserPosts}`)
	switch(action.type) {
		case CREATE_NEW_POST:
			return [...state, action.newPost];
		case FETCH_USER_POSTS:
      return [...state, ...action.fetchedUserPosts];
		default :
			return state;
	}
  return state;
}

export function allPosts (state=[], action) {
  switch(action.type) {
    case FETCH_ALL_POSTS:
      return action.fetchedPosts;
    case FILTER_POSTS:
      return action.filteredPosts
    default :
      return state;
  }
  return state;
}


