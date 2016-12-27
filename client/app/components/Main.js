import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {signupUser, signupApiRequest} from '../actions/actionCreator.js'

// Main Compeonent to be connected to store
const Main = React.createClass({
	render() {
		return (
			<div>
				<h1>
					<Link to="/">Alike Me</Link>
				</h1>
				{React.cloneElement(this.props.children, this.props)}	
			</div>
		)
	}
})

// Connect App to store
function mapStatetoProps (state) {
	return {
		user: state.user,
		preferences: state.preferences
	}
}

// function mapDispatchToProps (dispatch) {
// 	return {
// 		signup: (username, email, password) => {
// 			let userData = {username, email, password};
// 			console.log("USERDATA", userData)
// 			dispatch(signupApiRequest(userData))
// 		}
// 	}
// }

const MainWrapper = connect(mapStatetoProps)(Main);

export default MainWrapper;				
