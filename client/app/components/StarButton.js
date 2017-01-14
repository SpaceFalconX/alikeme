import React from 'react'
import {Link} from 'react-router'
import {incrementStars} from '../actions/post_actions.js'
import CSSTransitionGroup from 'react-addons-css-transition-group' // ES6

const StarButton = React.createClass({
  starPost (e) {
    console.log("event")
    const {post, user} = this.props;
    this.props.dispatch(incrementStars(post.id, user.id))
  },

  render() {
    const {post, user} = this.props;
    //TODO: Add some conditional on rendering star button
    const starButton = (
      <div onClick={this.starPost} className="glyphicon glyphicon-star">
        <strong> {post.stars_count}</strong>
      </div>
    )

    return (
      <div>
        <div>
          <CSSTransitionGroup
            transitionName="star"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <span key={post.id}></span>
          </CSSTransitionGroup>
        </div>
        {starButton}
      </div>
    )
  }
})

export default StarButton;
