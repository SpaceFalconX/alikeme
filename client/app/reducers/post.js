import {CREATE_NEW_POST, UPDATE_POST, DELETE_POST, FETCH_ALL_POSTS, FETCH_USER_POSTS, FILTER_POSTS, CLEAR_POSTS} from '../actions/index.js'
export function createNewPost (newPost) {
  console.log("NEW POST", newPost)


export function createNewPost (state=[], action) {
  // console.log("HELPER POST", action.newPost,"HELPER STATE", state)
	const { user_id, username, category,category_id, id,
					content, title, tags,
					created_at, updated_at} = action.newPost;
	const createdPost = {
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
  return [action.newPost, ...state.posts]
}

export function userPosts (state=[], action) {
	switch(action.type) {
		case CREATE_NEW_POST:
			return [...state, action.newPost];
		case FETCH_USER_POSTS:
      //return [...state, ...action.fetchedUserPosts];
      return action.fetchedUserPosts
// =======
//     console.log("STATE", state, action)
//       // console.log("CREATE POSTS STATE", Object.assign({}, state, { posts: createNewPost(state, action)} ))
//       return Object.assign({}, state, { posts: createNewPost(state, action)} );
//       return state;
// =======
//     console.log("STATE", state, action)
//       return Object.assign({}, state, { posts: createNewPost(state, action)} );
//       return state;
// >>>>>>> to pull

//     case FETCH_USER_POSTS:
//       const {fetchedUserPosts} = action
//       return Object.assign({}, state, {posts: fetchedUserPosts})
//       return state;

// >>>>>>> refactor  store state shape
		default :
			return state;
	}
  return state;
}




export function allPosts (state=[], action) {
  switch(action.type) {
    case FETCH_ALL_POSTS:
<<<<<<< HEAD
      return action.fetchedPosts;
    case FILTER_POSTS:
      return state.concat(action.filteredPosts);
    case CLEAR_POSTS:
      return [];
// =======
//       return Object.assign({}, state, {posts: fetchedPosts})
// >>>>>>> refactor  store state shape
=======
      return Object.assign({}, state, {posts: action.fetchedPosts})
>>>>>>> to pull
    default :
      return state;
  }
  return state;
}


