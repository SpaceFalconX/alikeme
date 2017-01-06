import {combineReducers} from 'redux';
import {auth} from './auth.js'
import {userPosts} from './post.js'
import {tags} from './tags.js'
import {categories} from './categories.js'
import {routerReducer} from 'react-router-redux';

//combine all Reducers
const reducer = combineReducers({
	user: auth,
	userPosts,
  tags,
  categories,
  routing: routerReducer,
})

export default reducer;