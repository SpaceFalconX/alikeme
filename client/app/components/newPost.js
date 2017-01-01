import React from 'react'
import {browserHistory, Link} from 'react-router'



const MyFirstPost = React.createClass({
	render() {
		return (
			<div>
				<h2>MyFirstPost</h2><hr/>
				<div className="block">
					<h3> Hello {this.props.user.username}!</h3>
					<h4> Share your first post to start getting matched up! </h4>
				</div>
			</div>
		)
	}
})

export default MyFirstPost;