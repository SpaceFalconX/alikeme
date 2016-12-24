import defaults from './defaults.jsx';

export default function (state = defaults, action) {
  if(action.type === 'SUBMIT_ACTION'){
    return action.payload
  }

  if(action.type === 'FORMUPDATE_ACTION'){
    return {
      text: state.text,
      submitType: state.submitType,
      formText: action.payload
    }
  }

  else {
    return state
  }
}