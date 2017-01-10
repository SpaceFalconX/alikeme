import React from 'react'
import {browserHistory, Link} from 'react-router'
import {submitNewPost} from '../actions/post_actions.js'
import FriendsList from './FriendsList.js'


const ProfileSetup = React.createClass({

	handleSubmit(e) {
		e.preventDefault();
		const content = this.refs.content.value;
		const title = this.refs.title.value;
		const category = this.refs.category.value;
		const user_id = this.props.user.id;
		const username = this.props.user.username;
		const twitterHandle = this.refs.twitter.value
		const facebookUsername = this.refs.facebook.value
		let postData = {user_id, username, content, title, category_id, twitterHandle, facebookUsername}
		this.props.dispatch(submitNewPost(postData));
		this.refs.newPostForm.reset();
	},

	render() {
		return (
			<div className="col-md-9">
				<h2>ProfileSetup</h2><hr/>
				<div className="block">
					<h3> Hello {this.props.user.username}!</h3>
					<h3> Start setting up your profile!</h3>
					<div className="container">
						<h3>Here are some suggested users to follow</h3>
						<FriendsList {...this.props}/>
					</div>
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