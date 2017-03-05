import { ADD_NEW_MESSAGE, UPDATE_HISTORY, USER_JOIN, USER_LEAVE } from '../actions';
import { combineReducers } from 'redux';


// const byId = (state={}, action) => {
//   switch (action.type) {
//     case USER_JOIN:
//       return {...state, [action.userId]: [action.channel] }
//     case USER_LEAVE:
//
//     default:
//       return state;
//   }
// }

const listByChannel = (state={}, action) => {
  switch (action.type) {
    case USER_JOIN:
    case USER_LEAVE:
      return { ...state, [action.channel]: ids(state[action.channel], action) }
    default:
      return state;
  }
}

const ids = (state = [], action) => {
  switch (action.type) {
    case USER_JOIN:
      [...state, action.userId]
      return [...state, action.userId];
    case USER_LEAVE:
      const index = state.findIndex((userId) => userId === action.userId);
      return [...state.slice(0, index), ...state.slice(index) ];
    default:
      return state;
  }
}

export default combineReducers({
  listByChannel
});


// export function users(state=[], action) {
//   switch (action.type) {
//     case USER_JOIN:
//       [...state, action.userId]
//       return [...state, action.userId];
//     case USER_LEAVE:
//       index = state.findIndex((userId) => userId === action.userId);
//       return [...state.slice(0, index), ...state.slice(index) ];
//     default:
//       return state;
//   }
// }
//
//
// export default users;
