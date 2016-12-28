import defaults from './defaults.jsx';

export default function (state = defaults, action) {

  if(action.type === 'SUBMIT_ACTION'){
    return action.payload
  }

  if(action.type === 'FORMUPDATE_ACTION'){
    if(action.payload.updatedField === 'username'){
      return {
        ...state,
        username: action.payload.formText
      }
    } else {
      return {
        ...state,
        password: action.payload.formText
      }
    }
  }

  else {
    return state
  }
}