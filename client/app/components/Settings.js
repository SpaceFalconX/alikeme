import React from 'react';
import axios from 'axios'
import {setTwitterToDb} from '../actions/twitter_actions.js'

class Settings extends React.Component {

  handleSubmit (e) {
    e.preventDefault();
    const twitterLink = this.refs.twitterLink.value;
    const username = this.props.user.username;
    var postData = { username, twitterLink }
    this.props.dispatch(setTwitterToDb(postData));
    this.refs.twitterLink.value = "";
  }

  render () {
    return (
      <div className="row">
        <div className="col-lg-6">
          <h3 style={{paddingBottom: 10}}> Configure social media accounts </h3>
          <h4>Enter your twitter handle</h4>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <input className="form-control" type="text" ref="twitterLink" placeholder="eg: janedoe"/>
            </form>
          <button className="btn btn-sm linkto post-btn" onClick={this.handleSubmit.bind(this)}>Save twitter handle</button>
        </div>
      </div>
    )
  }
}

export default Settings
