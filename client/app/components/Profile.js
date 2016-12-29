import React from 'react';
import {Link} from 'react-router';
import NewInterest from './interests/newInterestComponent.jsx'
import Interests from './interests/InterestComponent.jsx'


class ProfileComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.params.username}'s Profile</h1>
        <img src='#' />

        <h2>make a post</h2>
        <NewInterest />


        <h2>my posts</h2>
        <Interests username={this.props.params.username} / >
        <br />

        <Link to='/browse'>Browse</Link>
        <br />
        <Link to="/">Sign Out</Link>
      </div>
    )
  }
}

export default ProfileComponent;