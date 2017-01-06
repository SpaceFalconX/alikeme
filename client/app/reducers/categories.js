// import {FETCH_CATEGORIES} from '../actions/index.js';

// const INITIAL_STATE = { categories: [] }

export function categories (state=[], action) {
  console.log(action.type, action)
  switch(action.type) {
    case 'FETCH_CATEGORIES':
    // console.log([state, ...action.categories])
      return state.concat(...action.categories)
    default:
      return state;
  }
  return state;
}