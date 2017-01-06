import axios from 'axios'
import {CREATE_NEW_POST, UPDATE_POST, DELETE_POST, FETCH_POSTS} from './index.js'

export function createPost(newPost) {
	return {
		type: CREATE_NEW_POST,
		newPost
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

// dont need to export this function
export function fetchPosts(fetchedPosts) {
	console.log(fetchedPosts)
	return {
		type: FETCH_POSTS,
		fetchedPosts
	}
}

export function submitNewPost (newPost) {
	return (dispatch) => {
		return axios.post('/api/post/new', newPost)
		.then((resp) => {
			dispatch(createPost(newPost))
		})
		.catch((err) => {
			console.log(`Error submit new post ${err}`);
		})
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

export function fetchPostsFromDb() {
console.log('FETCH')
 return (dispatch) => {
	 return axios.get('/api/post/all')
	 .then((resp) => {
		 console.log('resp.data...... ', resp.data)
		 dispatch(fetchPosts(resp.data))
	 })
	 .catch((err)=> {console.log(err)})
 }
}