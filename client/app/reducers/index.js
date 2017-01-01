import {combineReducers} from 'redux';
import {auth} from './auth.js'
import {userPosts} from './post.js'
import {routerReducer} from 'react-router-redux';

const reducer = combineReducers({
	user: auth,
	userPosts: userPosts,
	routing: routerReducer
})

export default reducer;