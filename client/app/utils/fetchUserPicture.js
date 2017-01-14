import axios from 'axios'

export default function fetchUserPicture (username) {
		return axios.post('/api/upload/fetchProfilePicture', {username} )
}