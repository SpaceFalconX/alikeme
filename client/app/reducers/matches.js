import {SET_MATCHES, CLEAR_MATCHES, INIT_PERSONALITY_MATCHES, CLEAR_PERSONALITY_MATCHES, GET_MATCHES_TABLE, UPDATE_MATCHES_TABLE} from '../actions/index.js'

export function matches (state=[], action) {
  switch(action.type) {
    case SET_MATCHES:
      return action.posts
    case CLEAR_MATCHES:
      return []
    default:
      return state;
  }
  return state;
}

export function personalityMatches (state=[], action) {
  switch(action.type) {
    case INIT_PERSONALITY_MATCHES:
      return [...state, ...action.matches];
    case CLEAR_PERSONALITY_MATCHES:
      return [];
    default:
      return state;
  }
  return state;
}

export function matchesTable (state=[], action) {
  switch(action.type) {
    case GET_MATCHES_TABLE:
      return [...state, ...action.matches];
    case UPDATE_MATCHES_TABLE:
      return [];
    default:
      return state;
  }
  return state;
}

