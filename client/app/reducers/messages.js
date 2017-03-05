import { ADD_NEW_MESSAGE, UPDATE_HISTORY } from '../actions';
import createList from './createList';
import users from './users';
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
};

const byId = (state={}, action) => {
  switch (action.type) {
    case ADD_NEW_MESSAGE:
      return { ...state, [action.message.timestamp]: { ...action.message } };

    case UPDATE_HISTORY:
      const nextState = { ...state }
      action.messages.forEach(message =>
        nextState[message.timestamp] = message);
      return { ...state, ...nextState};

    default:
      return state;
  }
};


const messages = combineReducers({
  listByChannel: listByChannel,
  byId,
});

export default messages;



// CUSTOMIZE COMBINE REDUCERS
/* const combineReducers = (reducers) => {
  return (state={}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action)
      return nextState;
    }, {})
  }
}
*/
