import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {signupApiRequest} from '../actions/actionCreator.js'
import Navbar from './Navbar'
const Main = React.createClass({
	render() {
		return (
			<div>
				<h1>
					<Link to="/">Alike Me</Link>
				</h1>
				<Navbar user={this.props.user} dispatch={this.props.dispatch}/>
				{React.cloneElement(this.props.children, this.props)}	
			</div>
		)
	}
})

function mapStatetoProps (state) {
	return {
		user: state.user,
		isAuthenticated: state.user.isAuthenticated,
		preferences: state.preferences
	}
}

const MainWrapper = connect(mapStatetoProps)(Main);

export default MainWrapper;				
