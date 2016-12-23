export default function (state = null, action) {
  console.log(action.type);

  return {
    text: "THIS IS TEXT FROM TEST REDUCER",
    other: "SOME OTHER TEXT"
  }
}