import {SET_MATCHES, CLEAR_MATCHES} from '../actions/index.js'
import {INIT_PERSONALITY_MATCHES, CLEAR_PERSONALITY_MATCHES, INCREMENT_STARS} from '../actions/index.js'

export function matches (state=[], action) {
  switch(action.type) {
    case SET_MATCHES:
      return action.posts
    case CLEAR_MATCHES:
      return []
    case INCREMENT_STARS:
      console.log("STATE", state, action)
      let i = state.findIndex((post)=>
        post.id === action.postid
      )
      if(i === -1) {
        return state;
      }
      return  [...state.slice(0, i),
              {...state[i], stars_count: state[i].stars_count + 1},
              ...state.slice(i + 1)
              ];
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

