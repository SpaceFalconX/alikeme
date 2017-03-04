import { ADD_NEW_MESSAGE, UPDATE_HISTORY, ADD_USER, REMOVE_USER } from './index'

export function addMessage( { message, channel } ) {
  console.log()
  return {
    type: ADD_NEW_MESSAGE,
    message,
    channel,
  };
}

export function updateHistory(messages, latestTimetoken, channel) {
  return {
    type: UPDATE_HISTORY,
    messages,
    latestTimetoken,
    channel,
  };
}


export function addUser(userID) {
  return {
    type: ADD_USER,
    payload: userID,
  };
}

export function removeUser(userID) {
  return {
    type: REMOVE_USER,
    payload: userID,
  };
}
