import {combineReducers} from 'redux';
import {auth} from './auth.js'
import {userPosts} from './post.js'
import {tags} from './tags.js'
import {routerReducer} from 'react-router-redux';

//combine all Reducers
const reducer = combineReducers({
	user: auth,
	userPosts,
	routing: routerReducer,
  tags
})

export default reducer;