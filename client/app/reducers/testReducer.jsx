export default function (state = null, action) {
  console.log(state)
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
    return {
      text: "THIS IS DEFAULT TEXT FROM TEST REDUCER",
      submitType: "SOME MORE DEFAULT TEXT",
      formText: "enter text here"
    }
  }
}