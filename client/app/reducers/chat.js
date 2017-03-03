import { ADD_NEW_MESSAGE } from '../actions';

export function chat (state={}, action) {
  switch (action.type) {
    case ADD_NEW_MESSAGE:
      console.log("STATE", state, action.message);
      return state;
    default:
      return state;
  }
}
