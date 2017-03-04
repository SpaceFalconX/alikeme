import { ADD_NEW_MESSAGE, UPDATE_HISTORY } from '../actions';
import { combineReducers } from 'redux';


const message = (state={}, action) => {
  switch (action.type) {
    case ADD_NEW_MESSAGE:
      return {
        text: action.message.text,
        username: action.message.username,
        timestamp: action.message.timestamp,
        channel: action.message.channel
      };
    default:
      return state;
  }
}


  const createList = (state=[], action) => {
    switch (action.type) {
      case ADD_NEW_MESSAGE:
        return [...state, action.message.timestamp];
      case UPDATE_HISTORY:
      // const history = action.messages.map((message) => message.entry);
        return state;
      default:
        return state;
    }
  }
// export const getList(state, channel) => state[channel];



const messages = () => {

  const listByChannel = (state={}, action) => {
    switch (action.type) {
      case ADD_NEW_MESSAGE:
        return {
          ...state,
          [action.channel]: createList(state[action.channel], action)
        };
      case UPDATE_HISTORY:
        return state;
      default:
        return state;
    }
  }


  const messagesById = (state={}, action) => {
    switch (action.type) {
      case ADD_NEW_MESSAGE:
        return {
          ...state,
          [action.message.timestamp]: message(undefined, action)
        };
      case UPDATE_HISTORY:
        return state;
      default:
        return state;
    }
  }

  return combineReducers({
    listByChannel,
    messagesById
  });
}

export const getIds = (state=[]) => state;



export function latestTimetoken(state=null, action) {
  switch (action.type) {
    case UPDATE_HISTORY:
      return action.latestTimetoken;
    default:
      return state;
  }
}


export default combineReducers({
  messages: messages(),
  latestTimetoken,
});
