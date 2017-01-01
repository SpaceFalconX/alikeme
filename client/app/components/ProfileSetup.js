import React from 'react'
import {browserHistory, Link} from 'react-router'
import {submitNewPost} from '../actions/post_actions.js'


const ProfileSetup = React.createClass({
	navToProfile () {
    browserHistory.push('/profile/' + this.props.user.username)
	},

	handleSubmit(e) {
		e.preventDefault();
		const content = this.refs.newPost.value;
		const user_id = this.props.user.id;
		const username = this.props.user.username;
		let postData = {user_id, username, content}
		this.props.dispatch(submitNewPost(postData));
		this.refs.newPostForm.reset();
	},

	render() {
		return (
			<div>
				<h2>ProfileSetup</h2><hr/>
				<div className="block">
					<h3> Hello {this.props.user.username}!</h3>
					
					<form ref="newPostForm" onSubmit={this.handleSubmit}>
						<h4> Make your first post and start matching up </h4>
						<input className="form-group" type="text" ref="newPost" placeholder="new post"/><br/>
						<input className="btn btn-default" type="submit" value="Submit Post"/>
					</form>
				</div>
			</div>
		)
	}
})

export default ProfileSetup;



	// selectPref (preference) {
	// 	this.props.preferences[preference] = !this.props.preferences[preference];
	// },

	// savePref() {
	// 	this.props.dispatch(preferencesApiRequest(this.props.preferences, this.props.params.username))
	// },

// <div>
// 				<h2>ProfileSetup</h2><hr/>
// 				<div className="block">
// 					<h3> Hello {this.props.user.username}!</h3>
// 					<h4> Why are you here?</h4>
// 				</div>
				
// 				<div className="col-md-8">
// 					{preferences.map((pref, i) => {
// 						return (
// 								<div key={i} onClick={this.selectPref.bind(null, pref)} className="list-group-item col-md-4">
// 									{preferences[pref]}
// 									<h3><span className="label label-default">{pref}</span></h3>
// 								</div>
// 							)
// 					})}
// 					<button onClick={this.savePref.bind(null, this.props.preferences)} className="btn btn-primary">Save Settings</button>
// 				</div>
// 			</div>