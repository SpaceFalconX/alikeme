import React from 'react'
import {Link} from 'react-router'
import {logoutClick} from '../actions/auth_actions.js'

// TODO: make a similar thing for followers
const StarredPosts = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    // make a conditional to see if 2 users starred each other's posts
  },
  render() {
    return (
      <div className="container">

      </div>
    )
  }
})

export default MyStarredMatched;
