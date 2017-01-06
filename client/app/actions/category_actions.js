import axios from 'axios';
import {FETCH_CATEGORIES} from './index.js';


export function fetchCategories() {
  return (dispatch) => {
    return axios.get('/api/categories')
    .then((resp) => {
      console.log("DATA", resp.data)
      dispatch(fetchAll(resp.data))
    })
  }
}



export function fetchAll(categories) {
  console.log("fetchCategories", categories)
  return {
    type: 'FETCH_CATEGORIES',
    categories
  }
}
