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
		const userData = { username, email, password, twitterLink };
		const { user, router } = this.props
		this.props.dispatch(signupApiRequest(userData)).then(() => {
			if(this.props.user.isAuthenticated) {
				this.props.router.push('/setup/' + this.props.user.username)
			}
		})
	},

	render() {

		return (
			<div className="jumbotron boxed center">
				<h2 className="signup">Join alike.me today</h2>
				<form className="form-horizontal" ref="signupForm" onSubmit={this.handleSubmit}>
					<div className="form-group">
				    <label className="col-lg-3 control-label">Username</label>
				    <div className="col-lg-9">
				      <input className="form-control" type="text" ref="username" placeholder="jane123"/>
				    </div>
				  </div>

					<div className="form-group">
						<label className="col-lg-3 control-label">Email</label>
						<div className="col-lg-9">
							<input className="form-control" type="email" ref="email" placeholder="user@email.com"/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-lg-3 control-label">Password</label>
						<div className="col-lg-9">
							<input className="form-control" type="password" ref="password" placeholder="password"/>
						</div>
					</div>

					<div className="form-group">
						<label className="col-lg-3 control-label">Twitter</label>
						<div className="col-lg-9">
							<input className="form-control" type="text" ref="twitter" placeholder="twitter handle"/>
						</div>
					</div><br/>

					<div className="form-actions">
						<input className="btn btn-default linkto signup-btn" type="submit" value="Signup"/>
					</div>

				</form>
			</div>
		)
	}
})

export default Signup;
