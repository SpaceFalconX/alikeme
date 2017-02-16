import {SET_MATCHES, CLEAR_MATCHES, INIT_PERSONALITY_MATCHES, CLEAR_PERSONALITY_MATCHES, GET_MATCHES_TABLE, UPDATE_MATCHES_TABLE, STARRED_POSTS_JOIN, UPDATE_STARRED_POSTS_MATCHES} from '../actions/index.js'

export function matches (state=[], action) {
  switch(action.type) {
    case UPDATE_STARRED_POSTS_MATCHES:
      const {ids} = action;
      const result = state.map((match) => {
        ids.map((id) => {
          if(match.id === id) {
            match.isStarred = true;
          }
          return match;
        })
        return match;
      })
      return result;
    case STARRED_POSTS_JOIN:
      let i = state.findIndex((post) => post.id === action.postid)
      if(i === -1) {
          return state;
      }
      if(!action.flag) {
        var operation = -1;
      } else {
        var operation = 1;
      }
      return  [...state.slice(0, i),
              {...state[i],
                stars_count: state[i].stars_count + operation,
                isStarred: action.flag
              },
              ...state.slice(i + 1)
              ];
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
