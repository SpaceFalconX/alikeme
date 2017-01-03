import axios from 'axios'

export function createPost(newPost) {
	return {
		type: 'CREATE_NEW_POST',
		newPost
	}
}

export function updatePost(updatedPost) {
	return {
		type: 'UPDATE_POST',
		updatedPost
	}
}

export function deletePost(deletedPost) {
	return {
		type: 'DELETE_POST',
		deletedPost
	}
}

export function submitNewPost (newPost) {
	return (dispatch) => {
		return axios.post('/api/post', newPost)
		.then((resp) => {
			dispatch(createPost(newPost))
		})
	}
}

export function updatePostToDb (updatedPost) {
	return (dispatch) => {
		return axios.post('/api/post', updatedPost)
		.then((resp) => {
			dispatch(updatePost(updatedPost))
		})
	}
}

export function deletePostFromDb (deletedPost) {
	return (dispatch) => {
		return axios.post('/api/post', deletedPost)
		.then((resp) => {
			dispatch(deletePost(deletedPost))
		})
	}
}