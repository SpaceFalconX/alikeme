import React from 'react'
import {Link} from 'react-router'
import {loginApiRequest, getFollowers, getFollowing} from '../actions/auth_actions.js'
import {fetchUserPostsFromDb, fetchStarredPostsFromDb} from '../actions/post_actions.js'
import {fetchCategories} from '../actions/category_actions.js'
import {initUserMatches} from '../actions/match_actions.js'
import {getWatsonData} from '../actions/watson_actions.js'

const Login = React.createClass({
	handleSubmit(e) {
		e.preventDefault();
		const {dispatch, router} = this.props
		const username = this.refs.username.value;
		const password = this.refs.password.value;
		const userData = {username, password}
		dispatch(loginApiRequest(userData))
		.then(() => {
			let {user} = this.props;
			if(user.isAuthenticated) {
				dispatch(fetchUserPostsFromDb(user.username))
				.then(() => dispatch(getFollowers(user.id)))
			  .then(() => dispatch(getFollowing(user.id)))
			  .then(() => dispatch(fetchStarredPostsFromDb(user.id)))
			  .then(() => dispatch(initUserMatches(user.username)))
			  .then(() => router.push({pathname:`/${username}`}))
			}
		})
		this.refs.loginForm.reset();
	},

	render() {
		return (
			<div className="col-md-6">
				<h2>Login</h2>
				<form ref="loginForm" onSubmit={this.handleSubmit}>
					<label>Username:</label><br/>
					<input className="form-group" type="text" ref="username" placeholder="username"/><br/>
					<label>Password:</label><br/>
					<input className="form-group" type="password" ref="password" placeholder="password"/><br/>
					<input className="btn btn-default" type="submit" value="Login"/>
					 <a onClick={this.clicker} className="btn btn-social-icon btn-twitter">
    					<span className="fa fa-twitter"></span>
  				</a>
					<a href="/auth/facebook" className="btn btn-social-icon btn-facebook">
    					<span className="fa fa-facebook"></span>
  				</a>
					<a onClick={this.clicker} className="btn btn-social-icon btn-tumblr">
    					<span className="fa fa-tumblr"></span>
  				</a>
				</form>
				<div>
						<p>New to Alike.me?</p>
						<Link to="/">Go to Signup Page</Link>
				</div>
			</div>
		)
	}
})

export default Login;
