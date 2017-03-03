import axios from 'axios';

export function getWatsonTwitterData(twitter) {
  return dispatch => axios.post('/api/watson/twitter/personality', {twitter})
	.then((resp) => {
    //console.log('watson twitter analysis', resp.data)
    return resp.data
  });
}

export function getWatsonTextData(text) { //should not be needed, should handle server-side on login
  return dispatch => axios.post('/api/watson/text/personality', text)
	.then((resp) => {
    //console.log('watson text analysis', resp.data)
    return resp.data
  });
}