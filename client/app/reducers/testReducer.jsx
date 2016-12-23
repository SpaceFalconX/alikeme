export default function (state = null, action) {

  if(action.type === 'TEST_ACTION'){
    return action.payload
  } else {
    return {
      text: "THIS IS DEFAULT TEXT FROM TEST REDUCER",
      other: "SOME OTHER TEXT"
    }
  }

}