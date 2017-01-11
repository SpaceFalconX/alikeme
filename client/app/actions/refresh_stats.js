import axios from 'axios';
import { REFRESH_STATS } from './index.js';



export function refreshStats(userData) {
  console.log('inside refreshStats action', userData)
  return {
    type: REFRESH_STATS,
    userData
  }
}


export function fetchUserDataFromWatson(userData) {
  return function (dispatch) {
    return axios.get('/api/watson', userData)
    .then(resp => {
      dispatch(refreshStats(userData))
    })
    .catch(err => console.log('Err ', err))
  }
}