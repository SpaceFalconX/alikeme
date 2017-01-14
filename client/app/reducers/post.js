import {CREATE_NEW_POST, UPDATE_POST, DELETE_POST, FETCH_ALL_POSTS, FETCH_USER_POSTS, FILTER_POSTS, CLEAR_POSTS, FETCH_PUBLIC_POSTS, INCREMENT_STARS} from '../actions/index.js'

export function createNewPost (action) {
	const { user_id, username, category, category_id, id, content, title, tags, created_at, updated_at} = action;
	return {
    title: title,
    created_at: Date.now(),
    updated_at: Date.now(),
    content: content,
    id: id,
    stars_count: 0,
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
	switch(action.type) {
		case CREATE_NEW_POST:
      const newStuff = createNewPost(action.newPost)
			return [...state, {...newStuff, tags: newStuff.tags}];
		case FETCH_USER_POSTS:
      return action.fetchedUserPosts
		default :
			return state;
	}
  return state;
}


export function publicPosts (state=[], action) {
  switch(action.type) {
    case INCREMENT_STARS:
      return state;
    case FETCH_PUBLIC_POSTS:
      return action.fetchedPublicPosts
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
      return state.filter((post) => {
        return post.category.name === action.category;
      })
    case CLEAR_POSTS:
      return [];
    default :
      return state;
  }
  return state;
}


