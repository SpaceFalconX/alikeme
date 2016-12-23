export default function (text, other) {
  return {
      type: 'SUBMIT_ACTION',
      payload: {
        text: text,
        other: other,
        formText: ""
      }
  }
}