import axios from 'axios'

export default function fetchUserPicture (username) {
  axios.post('/api/upload/fetchProfilePicture', {username} )
		.then((resp) => {
			console.log('RESP FROM AXIOS', resp)
      return resp
		})
		.catch((err) => { console.log('ERROR', err) })
}