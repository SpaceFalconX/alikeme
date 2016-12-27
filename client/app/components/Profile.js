import React from 'react'
import {Link} from 'react-router'

const Profile = React.createClass({
	render() {
		return (
			<div>
				<h2>Profile</h2>
				<h4> Hello {this.props.user.username}!</h4>
			</div>
		)
	}
})

export default Profile;				
