export default function (state = null, action) {
  if(action.type === 'TEST_ACTION'){
    return action.payload
  }

  if(action.type === 'FORMUPDATE_ACTION'){
    return {
      text: state.text,
      other: state.other,
      formText: action.payload
    }
  }


  else {
    return {
      text: "THIS IS DEFAULT TEXT FROM TEST REDUCER",
      other: "SOME OTHER TEXT",
      formText: "enter text here"
    }
  }
}