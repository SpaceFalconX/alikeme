import { ADD_NEW_MESSAGE } from './types.js'

export function addMessage(message) {
  console.log(message)
  return {
    type: ADD_NEW_MESSAGE,
    message
  };
}
