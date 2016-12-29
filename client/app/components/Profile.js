import React from 'react';
import {Link} from 'react-router';
import NewInterest from './interests/newInterestComponent.jsx'
import Interests from './interests/InterestComponent.jsx'
import NavBar from './navBar.jsx'


class ProfileComponent extends React.Component {
  render() {
    return (
      <div>
        <NavBar username={this.props.user.username} />
        <h1>{this.props.params.username}'s Profile</h1>
        <img src='#' />

        <h2>make a post</h2>
        <NewInterest />

        <h2>my posts</h2>
        <Interests username={this.props.params.username} / >
      </div>
    )
  }
}

export default ProfileComponent;