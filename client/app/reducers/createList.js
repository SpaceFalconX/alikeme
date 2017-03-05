import { combineReducers } from 'redux';
import { ADD_NEW_MESSAGE, UPDATE_HISTORY } from '../actions';




  const createList = (state=[], action) => {
    // if(action.channel === channel) {
    //   return state;
    // }
    switch (action.type) {
      case ADD_NEW_MESSAGE:
        return [...state, action.message.timestamp];
      case UPDATE_HISTORY:
        const newIds = action.messages.map((msg) => msg.timestamp)
        return !state.length? newIds:
        [...state, ...newIds.filter(id => state.indexOf(id) === -1)]
      default:
        return state;
    }
  }

export default createList;
