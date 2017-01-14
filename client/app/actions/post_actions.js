import axios from 'axios'
import {CREATE_NEW_POST, UPDATE_POST, DELETE_POST,FETCH_ALL_POSTS, FETCH_USER_POSTS, FETCH_PUBLIC_POSTS, FILTER_POSTS, CLEAR_POSTS, INCREMENT_STARS} from './index.js'

export function createPost(newPost) {
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

export function filterPosts(category) {
	return {
		type: FILTER_POSTS,
		category
	}
}

export function clearPosts () {
	return {
		type: CLEAR_POSTS
	}
}

export function increment(postid, userid) {
	console.log("postid, userid", postid, userid)
	return {
		type: INCREMENT_STARS,
		postid,
		userid
	}
}


export function incrementStars(postid, userid) {
	console.log("{postid, userid}", {postid, userid})
	return (dispatch) => {
		return axios.post(`/api/star/post/`, {postid, userid} )
		.then((resp) => {
			console.log("RESP", resp)
			dispatch(increment(postid, userid))
		})
		.catch((err)=> {console.log(err)})
	}
}

export function submitNewPost (newPost) {
	return (dispatch) => {
		return axios.post('/api/post/new', newPost)
		.then(({data}) => {
			let result = {...newPost, ...data}
			console.log("RESULT NEWWWW", result)
			dispatch(createPost(result))
		})
		.catch((err) => {
			console.log(`Error on submit new post: ${err}`);
		})
	}
}

export function fetchUserPostsFromDb(username) {
	return (dispatch) => {
		return axios.get(`/api/post/${username}`, )
		.then((resp) => {
			dispatch(fetchUserPosts(resp.data))
		})
		.catch((err)=> {console.log(err)})
	}
}

export function fetchPublicPostsFromDb(username) {
	return (dispatch) => {
		return axios.get(`/api/post/${username}`, )
		.then((resp) => {
			dispatch(fetchPublicPosts(resp.data))
		})
		.catch((err)=> {console.log(err)})
	}
}

export function fetchPostsFromDb() {
  return dispatch => axios.get('/api/post')
	 .then((resp) => {
		 dispatch(fetchPosts(resp.data))
	 })
	 .catch((err) => { console.log(err) });
}

// export function filterPostsFromDb(categoryName) {
//  // return (dispatch) => {
//  // 	return axios.post('/api/post/categories', {categoryName})
// 	//  .then((resp) => {
// 		 dispatch(filterPosts(categoryName))
// 	//  })
// 	//  .catch((err)=> {console.log(err)})
//  // }
// }

export function filterTagsfromDb(tag){
	return (dispatch) => {
	return axios.post('/api/post/tags', {tag})
		.then((resp) => {
		})
		.catch((err)=> {console.log(err)})
	}
}

//get by username instead of id, calls get by id after db query
//initialize on load of public and user profile view

// <<<<<<< 0020f8a14dfff93d31a9d668e5298e1068a0bccf
// =======
// export function getPostsByUsername (username) {
// 	return (dispatch) => {
// 		return axios.post('/api/post/getUserId', {username})
// 		.then((resp) => {
// 			console.log('db data back from getPostsByUsername', resp.data)
// 			dispatch(fetchUserPostsFromDb(resp.data))
// 		})
// 		.catch((err)=> {console.log(err)})
//  }
// }

// >>>>>>> test

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

