import {combineReducers} from 'redux';
import {auth} from './auth.js'
import {userPosts, allPosts} from './post.js'
import {tags} from './tags.js'
import {stats} from './stats.js'
import {categories} from './categories.js'
import {matches} from './matches.js'
import {routerReducer} from 'react-router-redux';
import {LOGOUT_USER} from '../actions/index.js';

//combine all Reducers
const appReducer = combineReducers({
  user: auth,
  userPosts,
  allPosts,
  tags,
  categories,
  matches,
  routing: routerReducer,
  stats
})

const defaultState = {
  user: { isAuthenticated: false},
  userPosts: {
    posts: [],
    filterBy: "all"
  },
  allPosts: {
    posts: [],
    filterBy: "all"
  },
  categories: [],
  tags: [],
  matches: []
}

const reducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    state = defaultState;
  }
  return appReducer(state, action)
}

export default reducer;