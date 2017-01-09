import axios from 'axios';

export function setTwitter(twitter) {
	return {
		type: SET_TWITTER,
		twitter
	}
}   

export function setTwitterToDb(body) {
  return dispatch => axios.post('/api/twitter/setTwitter', body)
	.then((resp) => {
    //dispatch(updatePost(updatedPost));
    //console.log('bitch')
  });
}