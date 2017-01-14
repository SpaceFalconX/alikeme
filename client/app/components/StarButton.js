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
    return (
      <div>
        <div>
          <CSSTransitionGroup
            transitionName="star"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <span key={post.id}><strong>{post.stars_count}</strong></span>
          </CSSTransitionGroup>
        </div>
        <button onClick={this.starPost}>
          <span className="glyphicon glyphicon-star"><strong>{post.stars_count}</strong></span>
        </button>
      </div>
    )
  }
})

export default StarButton;
