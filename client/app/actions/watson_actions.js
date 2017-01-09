import axios from 'axios';

export function getWatsonData(twitter) {
  return dispatch => axios.post('/api/watson/personality', {twitter})
	.then((resp) => {
    console.log('watson res', resp.data)
  });
}