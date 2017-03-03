import axios from 'axios'
import {CREATE_NEW_POST, UPDATE_POST, DELETE_POST,FETCH_ALL_POSTS, FETCH_USER_POSTS, FETCH_PUBLIC_POSTS, FILTER_POSTS, CLEAR_POSTS, STARRED_POSTS_JOIN, GET_STARRED_POSTS, UPDATE_STARRED_POSTS} from './index.js'

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

export function toggle(postid, userid, flag) {
	return {
		type: STARRED_POSTS_JOIN,
		postid,
		userid,
		flag
	}
}


export function fetchStarredPosts(userid, STARRED_POSTS_JOIN) {
	return {
		type: GET_STARRED_POSTS,
		userid,
		STARRED_POSTS_JOIN
	}
}

export function updateStarredPosts(userid, posts, starredPosts) {
	return {
		type: UPDATE_STARRED_POSTS,
		userid,
		posts,
		starredPosts
	}
}

export function fetchStarredPostsFromDb(userid) {
	return (dispatch) => {
		return axios.get(`/api/star/join/${userid}`)
		.then(({data}) => {
			dispatch(fetchStarredPosts(userid, data));
		})
		.catch((err)=> err )
	}
}
export function toggleStar(postid, userid, flag) {
	return (dispatch) => {
		if(flag) {
			var url = `/api/star/post/unstar`
		} else {
			var url = `/api/star/post`
		}
		return axios.post(url, {postid, userid, flag} )
		.then((resp) => {
			flag = !flag
			dispatch(toggle(postid, userid, flag ))
		})
		.catch((err)=> err.message)
	}
}


export function submitNewPost (newPost) {
	return (dispatch) => {
		return axios.post('/api/post/new', newPost)
		.then(({ data }) => {
			let result = {...newPost, ...data}
			dispatch(createPost(result))
		})
		.catch((err) => {
			return err;
		})
	}
}

export function fetchUserPostsFromDb(username) {
	return (dispatch) => {
		return axios.get(`/api/post/${username}`, )
		.then((resp) => {
			dispatch(fetchUserPosts(resp.data))
		})
		.catch((err)=> err.message)
	}
}

export function fetchPublicPostsFromDb(username) {
	return (dispatch) => {
		return axios.get(`/api/post/${username}`, )
		.then((resp) => {
			dispatch(fetchPublicPosts(resp.data))
		})
		.catch((err)=> err.message)
	}
}

export function fetchPostsFromDb() {
  return dispatch => axios.get('/api/post')
	 .then((resp) => {
		 dispatch(fetchPosts(resp.data))
	 })
	 .catch((err) => err.message );
}


export function filterTagsfromDb(tag) {
	return (dispatch) => {
	return axios.post('/api/post/tags', {tag})
		.then((resp) => {
		})
		.catch((err)=> err.message)
	}
}
