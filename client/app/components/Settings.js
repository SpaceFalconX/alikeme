import React from 'react';
import axios from 'axios'
import {setTwitterToDb} from '../actions/twitter_actions.js'

class Settings extends React.Component {

  //TODO
  //get watson values with updated handle
  //create route to store new handle and updated values
  //create action/reducer on user store to update after process completed

  handleSubmit (e) {
    //console.log('called', this.props.user.username, this.refs.twitterLink.value)
    e.preventDefault();
    const twitterLink = this.refs.twitterLink.value;
    const username = this.props.user.username;
    var postData = { username, twitterLink }
    this.props.dispatch(setTwitterToDb(postData));
    this.refs.twitterLink.value = "";
  }

  handleImageUpload (e) {
    e.preventDefault()
    let data = new FormData()
    data.append('file', document.getElementById('file').files[0])
    //console.log(data)
    axios.post('/api/upload/setUserName', {username: this.props.user.username})
    .then((res) => {
      //console.log("uploading picture")
      //console.log(data)
      axios.post('/api/upload/uploadProfilePicture', data)
      .then((res) => {
        //console.log("UPLOADED BACK", res, res.data)
      })
    })
    .catch((err) => {
      return err.message
    })
  }

  render () {
    return (
      <div className="row">
        <div className="col-lg-9">
          <h3> Configure social media accounts </h3>
          Enter your <span className="fa fa-twitter"> </span> handle:
          <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="twitterLink" placeholder="eg: janedoe"/>
          </form> <br/>
          <button className="btn btn-sm" onClick={this.handleSubmit.bind(this)}>UPDATE</button>

          <h2>Update Profile Picture</h2>
          <form onSubmit={this.handleImageUpload.bind(this)}>
            <input id='file' type="file" encType="multipart/form-data" accept="image/*" ref="profilePicture" />
            <button className="btn btn-sm">UPLOAD</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Settings
