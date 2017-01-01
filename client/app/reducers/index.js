import {combineReducers} from 'redux';
import {auth} from './auth.js'
<<<<<<< 74096448a803b77a3b969ec577ddfdffd3b82730
import {userPosts} from './post.js'
=======
import {tags} from './tags.js'
>>>>>>> rebase
import {routerReducer} from 'react-router-redux';

const reducer = combineReducers({
	user: auth,
<<<<<<< 74096448a803b77a3b969ec577ddfdffd3b82730
	userPosts: userPosts,
	routing: routerReducer
})
=======
	routing: routerReducer,
  tags
}) //make sure name matches in props
>>>>>>> rebase

export default reducer;