import { ADD_NEW_MESSAGE, ADD_CHAT_HISTORY } from './index'

export function addMessage({ message, channel, publisher, timetoken }) {
  return {
    type: ADD_NEW_MESSAGE,
    message,
    channel, 
    publisher,
    timetoken
  };
}

export function addChatHistory(messages, timestamp) {
  return {
    type: ADD_CHAT_HISTORY,
    messages,
    timestamp,
  };
}
