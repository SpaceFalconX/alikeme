import axios from 'axios';
import { setUser } from './auth_actions';

// export function setTwitter(twitter) {
// 	return {
// 		type: SET_TWITTER,
// 		twitter
// 	}
// }

export function setTwitterToDb(body) {
  return dispatch => axios.post('/api/twitter/setTwitter', body)
	.then((resp) => {
    dispatch(setUser(body));
  });
}
