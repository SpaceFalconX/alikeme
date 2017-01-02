export function addTag (tag) {
  return {
    type: 'ADD_TAG',
    tag
  }
}

export function removeTag (tag) {
  return {
    type: 'REMOVE_TAG',
    tag
  }
}

export function clearTags () {
  return {
    type: 'CLEAR_TAGS'
  }
}