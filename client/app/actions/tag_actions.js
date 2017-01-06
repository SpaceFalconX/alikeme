import {ADD_TAG, REMOVE_TAG, CLEAR_TAGS}from './index.js'

export function addTag (tag) {
  console.log("ADD TAG ACT", tag)
  return {
    type: ADD_TAG,
    tag
  }
}

export function removeTag (tag) {
  return {
    type: REMOVE_TAG,
    tag
  }
}

export function clearTags () {
  return {
    type: CLEAR_TAGS
  }
}