import {REFRESH_STATS} from '../actions/index.js';

export function stats (state=[], action) {
  // //console.log('inside reducer ', state, action)
  switch(action.type) {
    case REFRESH_STATS:
    //console.log('inside reducer CASE ', state.concat(...action))
      return state.concat(...action)
    default:
      return state;
  }
  return state;
}