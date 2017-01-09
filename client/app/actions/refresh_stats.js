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
  console.log('inside fetUserDataFromWatson 1')
  return function (dispatch) {
    console.log('inside fetUserDataFromWatson 2', userData)
    return axios.get('/api/watson', userData)
    .then(resp => {
      console.log('dispatch action about to be called')
      dispatch(refreshStats(userData))
    })
    .catch(err => console.log('Err ', err))
  }
}