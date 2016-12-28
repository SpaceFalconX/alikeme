import defaults from './defaults.jsx';

export default function (state = defaults, action) {

  if(action.type === 'SUBMIT_ACTION'){
    return action.payload
  }

  if(action.type === 'FORMUPDATE_ACTION'){
    if(action.payload.updatedField === 'username'){
      return {
        text: state.text,
        submitType: state.submitType,
        username: action.payload.formText,
        password: state.password
      }
    } else {
      return {
        text: state.text,
        submitType: state.submitType,
        username: state.username,
        password: action.payload.formText
      }
    }
  }

  else {
    return state
  }
}