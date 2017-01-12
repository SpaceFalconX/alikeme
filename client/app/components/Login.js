import React from 'react'
import {Link} from 'react-router'
import {loginApiRequest, getFollowers, getFollowing} from '../actions/auth_actions.js'
import {fetchUserPostsFromDb} from '../actions/post_actions.js'
import {fetchCategories} from '../actions/category_actions.js'
import {getWatsonData} from '../actions/watson_actions.js'


const Login = React.createClass({
	handleSubmit(e) {
		e.preventDefault();
		const username = this.refs.username.value;
		const password = this.refs.password.value;
		let userData = {username, password}
		this.props.dispatch(loginApiRequest(userData))
		.then(() => {
			if(this.props.user.isAuthenticated) {
				this.props.dispatch(fetchUserPostsFromDb(username))
				.then(() => {
					this.props.dispatch(getFollowers(this.props.user.id))
			    .then(()=> {
			      this.props.dispatch(getFollowing(this.props.user.id))
			      .then(() => {
							this.props.router.push({pathname:`/${username}`})
			      })
			    })
				})
				.catch((err) => {
					console.log(err)
				})
			}
		})
		this.refs.loginForm.reset();
	},

	clicker(e) {
		e.preventDefault()
		console.log('cliked ', e )
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
