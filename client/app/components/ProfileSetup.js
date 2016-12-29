import React from 'react'
import {browserHistory, Link} from 'react-router'
import {selectPreferences, preferencesApiRequest} from '../actions/actionCreator.js'


const ProfileSetup = React.createClass({
	selectPref (preference) {
		this.props.preferences[preference] = !this.props.preferences[preference];
	},

	savePref() {
		this.props.dispatch(preferencesApiRequest(this.props.preferences, this.props.params.username))
	},

	navToProfile () {
    browserHistory.push('/profile/' + this.props.user.username)
	},

	render() {
		return (
			<div>
				<h2>ProfileSetup</h2><hr/>
				<div className="block">
					<h3> Hello {this.props.user.username}!</h3>
					<h4> Why are you here?</h4>
				</div>
			</div>
		)
	}
})

export default ProfileSetup;


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