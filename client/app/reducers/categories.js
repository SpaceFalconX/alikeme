import {FETCH_CATEGORIES} from '../actions/index.js';

export function categories (state=[], action) {
  switch(action.type) {
    case FETCH_CATEGORIES:
      return state.concat(...action.categories)
    default:
      return state;
  }
  return state;
}