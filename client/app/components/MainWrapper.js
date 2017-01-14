import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import Signup from './Signup'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import setAuthorizationToken from '../utils/setAuthorizationToken.js'
import {setUser, getFollowers, getFollowing} from '../actions/auth_actions.js'
import {fetchUserPostsFromDb } from '../actions/post_actions.js'
import {initUserMatches } from '../actions/match_actions.js'
import {fetchCategories} from '../actions/category_actions.js'
import {Promise} from 'bluebird'
import jwt from 'jsonwebtoken';


//React.cloneElement will clone/propogate props down through the children elements
const Main = React.createClass({

	componentWillMount() {
		if(localStorage.token) {
		  setAuthorizationToken(localStorage.token);
		  const decoded = jwt.decode(localStorage.token)
			Promise.join(
		    this.props.dispatch(setUser(decoded.user)),
		    this.props.dispatch(fetchUserPostsFromDb(decoded.user.username)),
		    this.props.dispatch(getFollowers(decoded.user.id)),
		    this.props.dispatch(getFollowing(decoded.user.id)),
		    this.props.dispatch(initUserMatches(decoded.user.username))
		  ).then(() => (console.log("ALL DATA FETCHED")))
		}
	},

	render() {
	const isAuthenticated = this.props.user.isAuthenticated;

	const signedInUser = (
				<div>
					<h1>
						<Link to="/">aLike.me</Link>
					</h1>
					<Navbar user={this.props.user} dispatch={this.props.dispatch}/>
					<Sidebar user={this.props.user} dispatch={this.props.dispatch}/>
					{ React.cloneElement(this.props.children, this.props) }
			  </div>
	 )
		return (
      <div>
				{signedInUser}
     </div>
		)
	}
})

export const defaultState = {
	user: {
		isAuthenticated: false,
		following: [],
		followers: []
	},
	userPosts: [],
	allPosts: [],
	publicPosts: [],
	categories: [],
	tags: [],
	matches: [],
	personalityMatches: []
}

function mapStatetoProps (state=defaultState) {
	return {
		user: Object.assign(state.user, ...state.user, {following: state.user.following, followers: state.user.followers}),
		tags: state.tags,
		categories: state.categories,
		userPosts: state.userPosts,
		allPosts: state.allPosts,
		personalityMatches: state.personalityMatches,
		publicPosts: state.publicPosts,
		matches: state.matches
	}
}



//init Redux store to React main
const MainWrapper = connect(mapStatetoProps)(Main);

export default MainWrapper;

