import axios from 'axios'


export function createPost(newPost) {
	return {
		type: 'CREATE_NEW_POST',
		newPost
	}
}

export function submitNewPost (newPost) {
	console.log(newPost)
	return (dispatch) => {
		return axios.post('/api/post', newPost)
		.then((resp) => {
			//dispatch(createPost(newPost))
		})
	}
}