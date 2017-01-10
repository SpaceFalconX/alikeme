import axios from 'axios'
import {CREATE_NEW_POST, UPDATE_POST, DELETE_POST,FETCH_ALL_POSTS, FETCH_USER_POSTS, FETCH_PUBLIC_POSTS, FILTER_POSTS, CLEAR_POSTS} from './index.js'

export function createPost(newPost) {
	//console.log("NEW POST ACTION CERATOR", newPost)
	return {
		type: CREATE_NEW_POST,
		newPost
	}
}

export function fetchPosts(fetchedPosts) {
	return {
		type: FETCH_ALL_POSTS,
		fetchedPosts
	}
}

export function fetchUserPosts(fetchedUserPosts) {
	return {
		type: FETCH_USER_POSTS,
		fetchedUserPosts
	}
}

export function fetchPublicPosts(fetchedPublicPosts) {
	return {
		type: FETCH_PUBLIC_POSTS,
		fetchedPublicPosts
	}
}

export function filterPosts(filteredPosts) {
	return {
		type: FILTER_POSTS,
		filteredPosts
	}
}

export function clearPosts () {
	return {
		type: CLEAR_POSTS
	}
}

export function submitNewPost (newPost) {
	console.log("SUBMIT POST", newPost)
	return (dispatch) => {
		return axios.post('/api/post/new', newPost)
		.then(({data}) => {
			let result = {...newPost, ...data}
			dispatch(createPost(result))
		})
		.catch((err) => {
			console.log(`Error on submit new post: ${err}`);
		})
	}
}

export function fetchUserPostsFromDb(username) {
	console.log('called with', username)
	return (dispatch) => {
		return axios.get(`/api/post/${username}`, )
		.then((resp) => {
			console.log("USER POSTS",resp.data)
			dispatch(fetchUserPosts(resp.data))
		})
		.catch((err)=> {console.log(err)})
	}
}

export function fetchPublicPostsFromDb(username) {
	console.log('called with', username)
	return (dispatch) => {
		return axios.get(`/api/post/${username}`, )
		.then((resp) => {
			console.log("PUBLIC POSTS", resp.data)
			dispatch(fetchPublicPosts(resp.data))
		})
		.catch((err)=> {console.log(err)})
	}
}


export function fetchPostsFromDb() {
  return dispatch => axios.get('/api/post')
	 .then((resp) => {
		 console.log('resp.data...... ', resp.data);
		 dispatch(fetchPosts(resp.data))
	 })
	 .catch((err) => { console.log(err) });
}

////////buildling
export function filterPostsFromDb(categoryid) {
 return (dispatch) => {
 	return axios.post('/api/post/categories', {categoryid})
	 .then((resp) => {
		 console.log('db data back', resp.data)
		 dispatch(filterPosts(resp.data))
	 })
	 .catch((err)=> {console.log(err)})
 }
}

export function filterTagsfromDb(tag){
	return (dispatch) => {
	return axios.post('/api/post/tags', {tag})
		.then((resp) => {
			console.log('db data back', resp.data)
		})
		.catch((err)=> {console.log(err)})
	}
}

//get by username instead of id, calls get by id after db query
//initialize on load of public and user profile view


// export function getPostsByUsername (username) {
// 	return (dispatch) => {
// 		return axios.post('/api/post/getUserId', {username})
// 		.then((resp) => {
// 			//console.log('db data back', resp.data)
// 			dispatch(fetchUserPostsFromDb(resp.data))
// 		})
// 		.catch((err)=> {console.log(err)})
//  }
// }

// export function updatePost(updatedPost) {
//   return {
//   type: UPDATE_POST,
//   updatedPost,
// };
// }

// export function deletePost(deletedPost) {
// 	return {
// 		type: DELETE_POST,
// 		deletedPost
// 	}
// }

// export function updatePostToDb(updatedPost) {
//   return dispatch => axios.put('/api/post', updatedPost)
// 		.then((resp) => {
//   dispatch(updatePost(updatedPost));
// });
// }

// export function deletePostFromDb(deletedPost) {
//   return dispatch => axios.delete('/api/post', deletedPost)
// 		.then((resp) => {
//   dispatch(deletePost(deletedPost));
// });
// }

