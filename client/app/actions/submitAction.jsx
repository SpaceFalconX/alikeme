export default function (text, submitType) {
  return {
      type: 'SUBMIT_ACTION',
      payload: {
        text: text,
        submitType: submitType,
        formText: ""
      }
  }
}