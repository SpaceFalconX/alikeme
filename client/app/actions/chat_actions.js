import { ADD_NEW_MESSAGE, UPDATE_HISTORY, USER_JOIN, USER_LEAVE, GET_ACTIVE_USERS } from './index'

export function addMessage( { message, channel } ) {
  console.log("addMessage",channel)
  return {
    type: ADD_NEW_MESSAGE,
    message,
    channel,
  };
}

export function updateHistory(messages, latestTimetoken, channel) {
  console.log("updateHistory",channel)
  return {
    type: UPDATE_HISTORY,
    messages,
    latestTimetoken,
    channel,
  };
}


export function addUserToChannel(userId, channel) {
  return {
    type: USER_JOIN,
    userId,
    channel,
  };
}

export function removeUserFromChannel(userId, channel) {
  return {
    type: USER_LEAVE,
    userId,
    channel
  };
}

export function getActiveUsers(users) {
  return {
    type: GET_ACTIVE_USERS,
    users
  };
}
