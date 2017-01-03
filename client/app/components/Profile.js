import React from 'react';
import {connect} from 'react-redux';
import NewInterest from './interests/newInterestComponent.jsx'
import NewEntry from './entries/newEntryComponent.jsx'
import Interests from './interests/InterestComponent.jsx'

//todo
//make code reuseable for logged in and non-logged in users

class ProfileComponent extends React.Component {

  constructor (props) {
    super()
    this.state = {
      toggle: 'Interest'
    }
  }

  toggle () {
    this.state.toggle === 'Interest' ?
    this.setState({toggle: 'Entry'}) :
    this.setState({toggle: 'Interest'})
  }

  createNewPost () {    
    if (this.state.toggle === 'Interest') {
      return (
        <div>
          <NewInterest />
          <h4 onClick={this.toggle.bind(this)}>switch to entry</h4>
        </div>
      )
    } else {
      return (
        <div>
          <NewEntry />
          <h4 onClick={this.toggle.bind(this)}>switch to interest</h4>
        </div>
      )
    }
  }

  editOrView () {
    //todo
    //add method to check if user exists
    //add user not found render

    if(this.props.user.username !== this.props.params.username) {
      return (
        <div>
          <h1>{this.props.params.username}'s Profile</h1>
          <img src='#' />
          <br />
          <button className="btn btn-primary">Message {this.props.params.username}</button>
          <h2>{this.props.params.username}'s posts</h2>
          <Interests username={this.props.params.username} / >
        </div>
      )
    } else {
      return (
        <div>
          <h1>Your Profile</h1>
          <img src='#' />
          <h2>create a new {this.state.toggle}</h2>
          {this.createNewPost()}
          <h2>my posts</h2>
          <Interests username={this.props.params.username} / >
        </div>
      )
    }
  }

  render () {
    console.log(this.props.user.username)
    return (
      <div>
        {this.editOrView()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(ProfileComponent)