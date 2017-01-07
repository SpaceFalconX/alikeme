import axios from 'axios'
import {CREATE_NEW_POST, UPDATE_POST, DELETE_POST,FETCH_ALL_POSTS, FETCH_USER_POSTS} from './index.js'

export function createPost(newPost) {
	return {
		type: CREATE_NEW_POST,
		newPost
	}
}
export function fetchPosts(fetchedPosts) {
	console.log("ALL POSTS", fetchedPosts)
	return {
		type: FETCH_ALL_POSTS,
		fetchedPosts
	}
}

export function fetchUserPosts(fetchedUserPosts) {
	console.log("USER POSTS", fetchedUserPosts)
	return {
		type: FETCH_USER_POSTS,
		fetchedUserPosts
	}
}

export function submitNewPost (newPost) {
	console.log("NEW POST", newPost)
	return (dispatch) => {
		return axios.post('/api/post/new', newPost)
		.then((resp) => {
			newPost.tags = resp.data.tags;
			console.log("NEW POST PAYLOAD", newPost)
			dispatch(createPost(newPost))
		})
		.catch((err) => {
			console.log(`Error on submit new post: ${err}`);
		})
	}
}

export function fetchPostsFromDb() {
 return (dispatch) => {
	 return axios.get('/api/post')
	 .then((resp) => {
		 dispatch(fetchPosts(resp.data))
	 })
	 .catch((err)=> {console.log(err)})
 }
}

export function fetchUserPostsFromDb(userid) {
 return (dispatch) => {
	 return axios.get(`/api/post/${userid}`)
	 .then((resp) => {
	 	console.log(resp)
		 dispatch(fetchUserPosts(resp.data))
	 })
	 .catch((err)=> {console.log(err)})
 }
}







export function updatePost(updatedPost) {
	return {
		type: UPDATE_POST,
		updatedPost
	}
}

export function deletePost(deletedPost) {
	return {
		type: DELETE_POST,
		deletedPost
	}
}


export function updatePostToDb (updatedPost) {
	return (dispatch) => {
		return axios.put('/api/post', updatedPost)
		.then((resp) => {
			dispatch(updatePost(updatedPost))
		})
	}
}

export function deletePostFromDb (deletedPost) {
	return (dispatch) => {
		return axios.delete('/api/post', deletedPost)
		.then((resp) => {
			dispatch(deletePost(deletedPost))
		})
	}
}

