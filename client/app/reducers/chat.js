import { ADD_NEW_MESSAGE, UPDATE_HISTORY } from '../actions';
import { combineReducers } from 'redux';
import messages from './messages'
import users from './users'

export function latestTimetoken(state=null, action) {
  switch (action.type) {
    case UPDATE_HISTORY:
      return action.latestTimetoken;
    default:
      return state;
  }
}


export default combineReducers({
  messages,
  latestTimetoken,
  users,
});

export const getIds = (state=[]) => state;

// export const getActiveUsers = (state=[]) => state.users;

export const getMessagesByChannel = (messages, channel='TestChannel4') => {
  const ids = getIds(messages.listByChannel[channel]);
  const result = ids.map((id) => messages.messagesById[id]);
  return ids.map((id) => messages.messagesById[id]);
};
