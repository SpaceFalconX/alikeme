import { ADD_NEW_MESSAGE, UPDATE_HISTORY, USER_JOIN, USER_LEAVE, GET_ACTIVE_USERS } from '../actions';
import { combineReducers } from 'redux';


export default (state={}, action) => {
  switch (action.type) {
    case GET_ACTIVE_USERS:
      const newState = { ...state} || {};
      for(let channel in action.users) {
        action.users[channel].occupants.forEach((user) => (
          newState[user.uuid] = channel
        ));
      }
      return newState;
    case USER_JOIN:
      return {...state, [action.userId]: action.channel }
    case USER_LEAVE:
      const nextState = { ...state };
      delete nextState[action.userId];
      return nextState;
    default:
      return state;
  }
};


// const listByChannel = (state={}, action) => {
//   switch (action.type) {
//     case USER_JOIN:
//     case USER_LEAVE:
//       return { ...state, [action.channel]: ids(state[action.channel], action) }
//     default:
//       return state;
//   }
// }
//
// const ids = (state = [], action) => {
//   switch (action.type) {
//     case USER_JOIN:
//       [...state, action.userId]
//       return [...state, action.userId];
//     case USER_LEAVE:
//       const index = state.findIndex((userId) => userId === action.userId);
//       return [...state.slice(0, index), ...state.slice(index) ];
//     default:
//       return state;
//   }
// }
//
// export default combineReducers({
//   byId
//   listByChannel,
// });


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
// export default users;
