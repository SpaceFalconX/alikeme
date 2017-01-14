import React from 'react'
import {Link} from 'react-router'
import {logoutClick} from '../actions/auth_actions.js'

const Navbar = React.createClass({
	logout () {
		this.props.dispatch(logoutClick(this.props.user));
	},

	render() {
		const isAuthenticated = this.props.user.isAuthenticated;

		const currUserView = (
			<ul className="nav navbar-nav">
				<li><Link to={'/browse/'+this.props.user.username} >Browse</Link></li>
				<li><Link to={'/'+this.props.user.username}>Profile</Link></li>
				<li><Link to={'/message/'+ this.props.user.username}>Message</Link></li>
				<li><Link to={'/settings/'+this.props.user.username}>Settings</Link></li>
				<li onClick={this.logout.bind(null, this)}><a href='/'>Logout</a></li>
			</ul>
		);

		const noUserView = (
			<ul className="nav navbar-nav">
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/">Sign Up</Link></li>
			</ul>
		);

		return (
			<nav className="navbar navbar-default navbar-static-top">
			  <div className="container">
					{ isAuthenticated ? currUserView : noUserView }
			  </div>
			</nav>
		)
	}
})

export default Navbar;
