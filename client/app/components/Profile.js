import React from 'react';
import {Link} from 'react-router';
import {toggleView} from '../actions/actionCreator.js'
import NewInterest from './interests/newInterestComponent.jsx'
import NewEntry from './entries/newEntryComponent.jsx'
import Interests from './interests/InterestComponent.jsx'


class ProfileComponent extends React.Component {

  constructor (props) {
    super()

    this.state = {
      toggle: 'interest'
    }
  }

  toggle () {
    this.state.toggle === 'interest' ?
    this.setState({toggle: 'entry'}) :
    this.setState({toggle: 'interest'})

    //this.props.dispatch(toggleView('postToggle'));
    //why don't you WORK WTF
  }

  render() {
    return (
      <div>
        <h1>{this.props.params.username}'s Profile</h1>
        <img src='#' />

        <h2>create a new {this.state.toggle}</h2>
        {this.state.toggle === 'interest' ?
            <div>
              <NewInterest />
              <h4 onClick={this.toggle.bind(this)}>switch to entry</h4>
            </div>
          :
            <div>
              <NewEntry />
              <h4 onClick={this.toggle.bind(this)}>switch to interest</h4>
            </div>
        }

        <h2>my posts</h2>
        <Interests username={this.props.params.username} / >
      </div>
    )
  }
}

export default ProfileComponent;