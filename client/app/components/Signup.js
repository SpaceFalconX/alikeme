import React from 'react'
import {Link} from 'react-router'
import {signupApiRequest, signupUser} from '../actions/auth_actions.js'
import {getWatsonData} from '../actions/watson_actions.js'

const Signup = React.createClass({
	componentWillUpdate(nextProps, nextState) {
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
		const twitterLink = this.refs.twitter.value;
		const facebookLink = this.refs.facebook.value;
		this.props.dispatch(getWatsonData(twitterLink)).then((res) => {
			const agreeableness = res.agreeableness
			const conscientiousness = res.conscientiousness
			const emotionalRange = res.emotionalRange
			const extraversion = res.extraversion
			const openness = res.openness
			let userData = {
				username, email, password, twitterLink, facebookLink,
				agreeableness, conscientiousness, emotionalRange, extraversion, openness
			}
			this.props.dispatch(signupApiRequest(userData));
		})
	},

	render() {
		return (
			<div className="col-md-6">
				<div className="jumbotron"
				>
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
						<label>Facebook url:</label><br/>
						<span className="fa fa-facebook"></span>
						<input className="form-group" type="text" ref="facebook" placeholder="eg: janedoe"/><br/>
						<input className="btn btn-default" type="submit" value="Signup"/>
					</form>
					<div>
							<p>Already have an account?</p>
							<Link to="/login">Go to Login Page</Link>
					</div>
				</div>
			</div>
		)
	}
})

export default Signup;
