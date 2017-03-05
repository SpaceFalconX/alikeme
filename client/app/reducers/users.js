import { ADD_NEW_MESSAGE, UPDATE_HISTORY, USER_JOIN, USER_LEAVE } from '../actions';
import { combineReducers } from 'redux';


export function users(state=[], action) {
  switch (action.type) {
    case USER_JOIN:
      [...state, action.userId]
      console.log("State on JOIN", state, action.userId)
      return [...state, action.userId];
    case USER_LEAVE:
      console.log("State on LEAVE", state, action.userId)
      index = state.findIndex((userId) => userId === action.userId);
      return [...state.slice(0, index), ...state.slice(index) ];
    default:
      return state;
  }
}


export default users;
