import axios from 'axios';
import {FETCH_CATEGORIES} from './index.js';


export function fetchCategories() {
  return (dispatch) => {
    return axios.get('/api/category')
    .then((resp) => {
      dispatch(fetchAll(resp.data))
    })
  }
}

export function fetchAll(categories) {
  return {
    type: FETCH_CATEGORIES,
    categories
  }
}
