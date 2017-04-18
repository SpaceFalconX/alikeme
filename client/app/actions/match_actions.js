import axios from 'axios'
import {SET_MATCHES, INIT_PERSONALITY_MATCHES, CLEAR_PERSONALITY_MATCHES, CLEAR_MATCHES, UPDATE_STARRED_POSTS_MATCHES} from './index.js'

export function setMatches(posts) {
	return {
		type: SET_MATCHES,
		posts
	}
}

export function clearMatches () {
  return {
    type: CLEAR_MATCHES
  }
}

export function updateStarredPostsMatches (ids) {
  return {
    type: UPDATE_STARRED_POSTS_MATCHES,
		ids
  }
}

export function initMatches(matches) {
  return {
    type: INIT_PERSONALITY_MATCHES,
    matches
  }
}

export function clearPersonalityMatches(matches) {
  return {
    type: CLEAR_PERSONALITY_MATCHES,
    matches
  }
}

export function getMatches(id) {
  return dispatch => axios.get(`/api/post/matches/${id}`)
  .then(({data}) => {
    dispatch(setMatches(data));
  })
}

export function initUserMatches(username) {
  return dispatch => axios.get(`/api/user/matches/${username}`)
  .then((resp) => {
    dispatch(initMatches(resp.data));
  });
}
