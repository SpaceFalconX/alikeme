import React from 'react'
import {Link} from 'react-router'
import {signupApiRequest, signupUser} from '../actions/actionCreator.js'

const Signup = React.createClass({
	componentWillUpdate(nextProps, nextState) {
		console.log('UPDATE STATE AUTH SIGNUP', nextProps.user.isAuthenticated)
		if(nextProps.user.isAuthenticated===true) {
			nextProps.router.push({pathname:`/setup/${nextProps.user.username}`})
		} else {
			console.log('Signup error...')
		}
	},

	handleSubmit(e) {
		e.preventDefault();
		const username = this.refs.username.value;
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		let userData = {username, email, password}
		this.props.dispatch(signupApiRequest(userData));
		this.refs.signupForm.reset();
	},

	render() {
		return (
			<div>
				<h2>Signup</h2>
				<form ref="signupForm" onSubmit={this.handleSubmit}>
					<label>Username:</label><br/>
					<input className="form-group" type="text" ref="username" placeholder="username"/><br/>
					<label>Email address:</label><br/>
					<input className="form-group" type="email" ref="email" placeholder="email"/><br/>
					<label>Password:</label><br/>
					<input className="form-group" type="password" ref="password" placeholder="password"/><br/>
					<input className="btn btn-default" type="submit" value="Signup"/>
				</form>
				<div>
						<p>Already have an account?</p>
						<Link to="/login">Go to Login Page</Link> 
				</div>
			</div>
		)
	}
})

export default Signup;				
