import React from 'react'
import {Link} from 'react-router'
import {loginApiRequest} from '../actions/auth_actions.js'

const Login = React.createClass({
	componentWillUpdate(nextProps, nextState) {
		if(nextProps.user.isAuthenticated===true) {
			nextProps.router.push({pathname:`/profile/${nextProps.user.id}`})
		} else {
			console.log('Not Authenticated...')
		}
	},

	handleSubmit(e) {
		e.preventDefault();
		const username = this.refs.username.value;
		const password = this.refs.password.value;
		let userData = {username, password}
		this.props.dispatch(loginApiRequest(userData)).then((result) => {
			console.log("LOGIN SUCCESS?", result)
		})
		this.refs.loginForm.reset();
	},

	clicker(e) {
		e.preventDefault()
		console.log('cliked ', e )
	},

	render() {
		return (
			<div>
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
