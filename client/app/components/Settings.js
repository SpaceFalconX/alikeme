import React from 'react';
import {setTwitterToDb} from '../actions/twitter_actions.js'

class Settings extends React.Component {
  
  //TODO
  //get watson values with updated handle
  //create route to store new handle and updated values
  //create action/reducer on user store to update after process completed

  handleSubmit(e) {
    console.log('called', this.props.user.username, this.refs.twitter.value)
    e.preventDefault();
    const twitter = this.refs.twitter.value;
    const username = this.props.user.username;
    var postData = {username, twitter}
    this.props.dispatch(setTwitterToDb(postData));
    this.refs.twitter.value = ""
  }

  render () {
    return (
      <div>
      settings
      			<h3> Configure social media accounts </h3>
						<h5> Twitter </h5>
						Enter your <span className="fa fa-twitter"> </span> handle:
            <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="twitter" placeholder="eg: janedoe"/>
            </form> <br/>
            <button className="btn btn-sm" onClick={this.handleSubmit.bind(this)}>UPDATE</button>
      </div>
    )
  }
}

export default Settings