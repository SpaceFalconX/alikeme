export default function (formText, updatedField) {
  return {
      type: 'FORMUPDATE_ACTION',
      payload: {formText, updatedField}
  }
}