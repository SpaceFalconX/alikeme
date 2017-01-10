export function tags (state=[], action) {
  if(action.type === 'ADD_TAG'){
    if(state.indexOf(action.tag) !== -1) {
      return state
    }
    return [...state, action.tag ]
  }

  if(action.type === 'REMOVE_TAG') {
    return state.filter((tag) => {
      return tag !== action.tag
    })
  }

  if(action.type === 'CLEAR_TAGS') {
    return [];
  }
  return state
}