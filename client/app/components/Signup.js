import React from 'react'
import {Link, browserHistory} from 'react-router'
import {signupApiRequest, signupUser} from '../actions/auth_actions.js'
import {getWatsonTwitterData} from '../actions/watson_actions.js'

const Signup = React.createClass({
	
	componentWillReceiveProps (nextProps) {
		if(nextProps.user.isAuthenticated) {
			browserHistory.push('/' + nextProps.user.username)
		}
	},

	handleSubmit(e) {
		e.preventDefault();
		const username = this.refs.username.value;
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		const twitterLink = this.refs.twitter.value;
		this.props.dispatch(getWatsonTwitterData(twitterLink)).then((res) => {
			const agreeableness = res.agreeableness
			const conscientiousness = res.conscientiousness
			const emotionalRange = res.emotionalRange
			const extraversion = res.extraversion
			const openness = res.openness
			let userData = {
				username, email, password, twitterLink,
				agreeableness, conscientiousness, emotionalRange, extraversion, openness
			}
			let {user, router} = this.props
			this.props.dispatch(signupApiRequest(userData)).then(()=> {
				router.push({pathname:`/setup/${user.username}`})
			})
		})
	},

	render() {
		const welcomeCSS = {
			marginTop: '20vh'
		}

		return (
			<div>
				<div className="col-md-6">
					<div className="jumbotron">
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
					<div className="col-md-6" style={welcomeCSS}>
					<h2> Welcome to aLike.me </h2>
					<br/>
					<p className="lead"> aLike.me aims to limit uncertainty and sift through the noise human beings have generated to more accurately match you with things that you care about. It achieves this by leveraging a sophisticated analytical AI software that analyzes your posts and twitter text to get your personality model. </p>
				</div>
			</div>
		)
	}
})

export default Signup;

	// <div className="jumbotron">
	// 				<h2>Signup</h2>
	// 				<form ref="signupForm" onSubmit={this.handleSubmit}>
	// 					<label>Username:</label><br/>
	// 					<input className="form-group" type="text" ref="username" placeholder="username"/><br/>
	// 					<label>Email address:</label><br/>
	// 					<input className="form-group" type="email" ref="email" placeholder="email"/><br/>
	// 					<label>Password:</label><br/>
	// 					<input className="form-group" type="password" ref="password" placeholder="password"/><br/>
	// 					<label>Twitter handle:</label><br/>
	// 					<span className="fa fa-twitter"></span>
	// 					<input className="form-group" type="text" ref="twitter" placeholder="eg: janedoe"/><br/>
	// 					<label>Facebook url:</label><br/>
	// 					<span className="fa fa-facebook"></span>
	// 					<input className="form-group" type="text" ref="facebook" placeholder="eg: janedoe"/><br/>
	// 					<input className="btn btn-default" type="submit" value="Signup"/>
	// 				</form>
	// 				<div>
	// 						<p>Already have an account?</p>
	// 						<Link to="/login">Go to Login Page</Link>
	// 				</div>
	// 			</div>

							// 	<label>Facebook url:</label><br/>
							// <span className="fa fa-facebook"></span>
							// <input className="form-group" type="text" ref="facebook" placeholder="eg: janedoe"/><br/>