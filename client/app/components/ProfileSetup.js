import React from 'react'
import {browserHistory, Link} from 'react-router'
import {submitNewPost} from '../actions/post_actions.js'
import {initUserMatches, clearPersonalityMatches} from '../actions/match_actions.js'
import FriendsList from './FriendsList.js'


const ProfileSetup = React.createClass({
	componentWillMount() {
		if(!this.props.personalityMatches.length) {
			this.props.dispatch(initUserMatches(this.props.user.username))
		}
	},

	// componentWillUnmount() {
	// 	this.props.dispatch(clearPersonalityMatches(this.props.personalityMatches))
	// },

	handleSubmit(e) {
		e.preventDefault();
		const content = this.refs.content.value;
		const title = this.refs.title.value;
		const category = this.refs.category.value;
		const twitterHandle = this.refs.twitter.value
		const facebookUsername = this.refs.facebook.value
		const user_id = this.props.user.id;
		const username = this.props.user.username;
		let postData = {user_id, username, content, title, category_id, twitterHandle, facebookUsername}
		this.props.dispatch(submitNewPost(postData));
		this.refs.newPostForm.reset();
	},

	render() {
		const btnStyle = {
			width: '100%'
		}
		const headerStyle = {
			'marginTop': '0px'
		}
		return (
			<div>
				<div className="col-md-8">
					<div className="col-md-8">
						<h2 style={headerStyle}>Suggested Users to Follow</h2>
					</div>
					<div className="col-md-4">
					<Link to={this.props.user.username}>
						<button className="btn btn-default pull-right" style={btnStyle}>
							Go To My Profile
						</button>
					</Link>
					</div>
				</div>
				<br />
				<div className="col-md-8">
					<div className="block">
						<div className="row">
							{
								this.props.personalityMatches.map((match, index)=>{
									return (<FriendsList key={index} dispatch={this.props.dispatch}
									match={match} user={this.props.user} router={this.props.router} />)
								})
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
})

export default ProfileSetup;