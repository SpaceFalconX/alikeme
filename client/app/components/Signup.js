import React from 'react'
import {Link, browserHistory} from 'react-router'
import {signupApiRequest, signupUser} from '../actions/auth_actions.js'
import {getWatsonTwitterData} from '../actions/watson_actions.js'

const Signup = React.createClass({

	handleSubmit(e) {
		e.preventDefault();
		const username = this.refs.username.value;
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		const twitterLink = this.refs.twitter.value;
		let userData = { username, email, password, twitterLink };
		let { user, router } = this.props
		this.props.dispatch(signupApiRequest(userData)).then(() => {
			if(this.props.user.isAuthenticated) {
				this.props.router.push('/setup/' + this.props.user.username)
			}
		})
	},

	render() {

		return (
				<div className="col-xs-6">
					<div className="jumbotron boxed">
						<h2>Signup</h2>
						<form ref="signupForm" onSubmit={this.handleSubmit}>
							<label>Username:</label><br/>
							<input className="form-group" type="text" ref="username" placeholder="username"/><br/>
							<label>Email address:</label><br/>
							<input className="form-group" type="email" ref="email" placeholder="email"/><br/>
							<label>Password:</label><br/>
							<input className="form-group" type="password" ref="password" placeholder="password"/><br/>
							<label>Twitter handle:</label><br/>
							<span className="fa fa-twitter"></span>
							<input className="form-group" type="text" ref="twitter" placeholder="eg: janedoe"/><br/>
							<input className="btn btn-default" type="submit" value="Signup"/>
						</form>
						</div>
					</div>
		)
	}
})

export default Signup;
