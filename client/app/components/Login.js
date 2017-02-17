import React from 'react'
import {Link} from 'react-router'
import { Promise } from 'bluebird'
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
				Promise.join(
					dispatch(fetchUserPostsFromDb(user.username)),
					dispatch(getFollowers(user.id)),
					dispatch(fetchCategories()),
					dispatch(getFollowing(user.id)),
					dispatch(fetchStarredPostsFromDb(user.id)),
					dispatch(initUserMatches(user.username))
				)
				.then(() => router.push({pathname:`/${username}`}))
			}
		})
		this.refs.loginForm.reset();
	},

	render() {
		return (

			<div className="jumbotron boxed center">
				<h2 className="signup">Login to your account</h2>
				<form className="form-horizontal" ref="loginForm" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label className="col-sm-3 control-label">Username</label>
						<div className="col-sm-9">
							<input className="form-control" type="text" ref="username" placeholder="jane123"/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label">Password</label>
						<div className="col-sm-9">
							<input className="form-control" type="password" ref="password" placeholder="password"/>
						</div>
					</div>

					<div className="form-actions">
						<input className="btn btn-default linkto signup-btn" type="submit" value="Login"/>
					</div>

				</form>
			</div>
		)
	}
})

export default Login;


// <div className="col-md-6">
// 	<h2>Login</h2>
// 	<form ref="loginForm" onSubmit={this.handleSubmit}>
// 		<label>Username:</label><br/>
// 		<input className="form-group" type="text" ref="username" placeholder="username"/><br/>
// 		<label>Password:</label><br/>
// 		<input className="form-group" type="password" ref="password" placeholder="password"/><br/>
// 		<input className="btn btn-default" type="submit" value="Login"/>
// 		 <a onClick={this.clicker} className="btn btn-social-icon btn-twitter">
// 				<span className="fa fa-twitter"></span>
// 		</a>
// 		<a href="/auth/facebook" className="btn btn-social-icon btn-facebook">
// 				<span className="fa fa-facebook"></span>
// 		</a>
// 		<a onClick={this.clicker} className="btn btn-social-icon btn-tumblr">
// 				<span className="fa fa-tumblr"></span>
// 		</a>
// 	</form>
// 	<div>
// 			<p>New to Alike.me?</p>
// 			<Link to="/">Go to Signup Page</Link>
// 	</div>
// </div>
