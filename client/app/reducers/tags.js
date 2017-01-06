export function tags (state=[], action) {
  if(action.type === 'ADD_TAG'){
    console.log("STATE", state)
    if(state.indexOf(action.tag) !== -1) {
      return state
    }
    return [...state, action.tag ]
  }

  if(action.type === 'REMOVE_TAG') {
    if(state.tags.indexOf(action.tag) === -1) {
      return state;
    }
    return [
        ...state,
        ...state.slice(0, state.indexOf(action.tag)),
        ...state.slice(state.indexOf(action.tag) + 1)
      ]
  }

  if(action.type === 'CLEAR_TAGS') {
    return [];
  }
  return state
}