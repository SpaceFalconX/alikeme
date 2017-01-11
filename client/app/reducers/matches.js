import {INIT_PERSONALITY_MATCHES, CLEAR_PERSONALITY_MATCHES} from '../actions/index.js'

export function matches (state=[], action) {
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

