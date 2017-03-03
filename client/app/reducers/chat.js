import { ADD_NEW_MESSAGE } from '../actions';
import { combineReducers } from 'redux';

const message = (state={}, action) => {
  switch (action.type) {
    case ADD_NEW_MESSAGE:
      return {
        text: action.message.text,
        username: action.message.username,
        timetoken: action.timetoken,
        publisher: action.publisher,
      };
    default:
      return state;
  }
}

const listByChannel = (state=[], action) => {
  switch (action.type) {
    case ADD_NEW_MESSAGE:
      return [...state, message(undefined, action)];
    default:
      return state;
  }
}


export function messages (state={}, action) {
  switch (action.type) {
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        [action.channel]: listByChannel(state[action.channel], action)
      };
    default:
      return state;
  }
}

export default combineReducers({
  messages,
});
