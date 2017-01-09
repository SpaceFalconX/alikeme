import axios from 'axios'
import {SET_MATCHES} from './index.js'

export function setMatches(posts) {
	return {
		type: SET_MATCHES,
		posts
	}
}  

export function getMatches(post) {
  return dispatch => axios.post('/api/post/matches', post)
	.then((resp) => {
    console.log('server res', resp.data)
    dispatch(setMatches(resp.data));
  });
}