export function tags (state= {
  tags: []
}, action) {

  if(action.type === 'ADD_TAG'){
    if(state.tags.indexOf(action.tag) !== -1) {
      return state
    }
    return {
      ...state,
      tags: [...state.tags, action.tag]
    }
  }

  if(action.type === 'REMOVE_TAG'){
    if(state.tags.indexOf(action.tag) === -1) {
      return state
    }
    return {
      ...state,
      tags: [
        ...state.tags.slice(0, state.tags.indexOf(action.tag)),
        ...state.tags.slice(state.tags.indexOf(action.tag) + 1)
      ],
    }
  }

  if(action.type === 'CLEAR_TAGS') {
    return {
      ...state,
      tags: []
    }
  }

  return state
}