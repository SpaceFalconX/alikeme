import { ADD_NEW_MESSAGE, UPDATE_HISTORY } from '../actions';
import createList from './createList'
import { combineReducers } from 'redux';



const listByChannel = (state={}, action) => {

  switch (action.type) {
    case ADD_NEW_MESSAGE:
    case UPDATE_HISTORY:
      return {
        ...state,
        [action.channel]: createList(state[action.channel], action)
      };
    default:
      return state;
  }
}

const messagesById = (state={}, action) => {
  switch (action.type) {
    case ADD_NEW_MESSAGE:
      return { ...state, [action.message.timestamp]: { ...action.message } }
    case UPDATE_HISTORY:
      const nextState = { ...state }
      action.messages.forEach(message =>
        nextState[message.timestamp] = message);
      return { ...state, ...nextState};
    default:
      return state;
  }
}

const messages = combineReducers({
  listByChannel,
  messagesById
});

export default messages;
