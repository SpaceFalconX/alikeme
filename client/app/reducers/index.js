import {combineReducers} from 'redux';
import {auth} from './auth.js'
import {posts} from './post.js'
import {tags} from './tags.js'
import {categories} from './categories.js'
import {routerReducer} from 'react-router-redux';
import {LOGOUT_USER} from '../actions/index.js';

//combine all Reducers
const appReducer = combineReducers({
  user: auth,
  posts,
  tags,
  categories,
  routing: routerReducer
})


const defaultState = {
  user: { isAuthenticated: false},
  posts: [{}],
  categories: [],
  tags: []
}

const reducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    state = defaultState;
  }
  return appReducer(state, action)
}

export default reducer;