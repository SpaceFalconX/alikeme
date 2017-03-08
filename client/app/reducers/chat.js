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
  users,
  latestTimetoken,
});

export const getIds = (state=[]) => state;


export const getMessages = (state, channel='LastTest') => {
  const ids = getIds(state.messages.listByChannel[channel]);
  const result = ids.map((id) => state.messages.byId[id]);
  return ids.map((id) => state.messages.byId[id]);
};

export const getUsers = (state={}) => Object.keys(state.users);

export const getLatestTimetoken = (state) => state.latestTimetoken;
