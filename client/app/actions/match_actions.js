import axios from 'axios'
import {SET_MATCHES, INIT_PERSONALITY_MATCHES, CLEAR_PERSONALITY_MATCHES, CLEAR_MATCHES} from './index.js'

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
  .then((data) => {
    console.log("DATA", data);
    // const normalized = data.map((match) => {
    //   const {compatibilityScore, relevantTags, weightedScore, originalPost} = match;
    //   return Object.assign({}, {compatibilityScore, relevantTags, weightedScore}, originalPost)
    // })
    dispatch(setMatches(data));
  })
}

export function initUserMatches(username) {
  return dispatch => axios.get(`/api/user/matches/${username}`)
  .then((resp) => {
    //console.log('server res', resp.data)
    dispatch(initMatches(resp.data));
  });
}
