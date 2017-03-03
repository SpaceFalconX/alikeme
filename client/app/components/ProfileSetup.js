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
			width: '100%',
			fontSize: '15',
			fontWeight: 600,
			backgroundColor: '#cfcfcf'
		}
		const headerStyle = {
			// backgroundColor: 'pink',
			// display: 'flex',
			// justifyContent: 'space-between',
			// alignItems: 'center'
		}
		return (
			<div className="row">
				<div className="col-lg-9">
					<div className="container-fluid" style={headerStyle}>
						<h2 className="pull-left">Suggested Users to Follow</h2>
						<Link to={this.props.user.username} className="pull-right">
							<button className="btn btn-default" style={btnStyle}>
								Skip
							</button>
						</Link>
					</div>
					<hr />
					{
						this.props.personalityMatches.map((match, index)=>{
							return (<FriendsList key={index} dispatch={this.props.dispatch}
							match={match} user={this.props.user} router={this.props.router} />)
						}).slice(0,10)
					}
				</div>
			</div>
		)
	}
})

export default ProfileSetup;
