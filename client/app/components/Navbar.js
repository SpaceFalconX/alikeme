import React from 'react'
import {Link} from 'react-router'
import {logoutClick} from '../actions/auth_actions.js'

const Navbar = React.createClass({

	username () {
		return this.props.user.isAuthenticated? this.props.user.username : '';
	},

	render() {
		const displayDemoLink = () => {
			if(this.props.user.username === 'isaac94') {
				return '/sevda634';
			} else {
				return ''
			}
		}
		const isAuthenticated = this.props.user.isAuthenticated;

		const currUserView = (
			<div>
				<ul className="nav navbar-nav navbar-left customized-nav">
					<li><Link to={'/browse/'+this.props.user.username} >Browse</Link></li>
					<li><Link to={'/'+this.props.user.username}>Profile</Link></li>
					<li><Link to={'/message/'+ this.props.user.username + displayDemoLink() }>Message</Link></li>
					<li><Link to={'/settings/'+this.props.user.username}>Settings</Link></li>
				</ul>

				<ul className="nav navbar-nav navbar-right customized-nav">
					<li onClick={() => this.props.dispatch(logoutClick()) }><Link to='/login'>Logout</Link></li>
				</ul>
			</div>
		);

		const noUserView = (
			<div>
			<ul className="nav navbar-nav navbar-right customized-nav">
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/signup">Sign Up</Link></li>
			</ul>
			</div>
		);

		return (
			<nav className="navbar navbar-default navbar-fixed-top customized-nav">
			  <div className="container-fluid">
				<Link className="navbar-brand logo" to={"/"+ this.username()}>aLike.me</Link>
					{ isAuthenticated ? currUserView : noUserView }
			  </div>
			</nav>
		)
	}
})

export default Navbar;
