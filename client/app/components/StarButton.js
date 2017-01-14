import React from 'react'
import {Link} from 'react-router'
import {incrementStars} from '../actions/post_actions.js'
import CSSTransitionGroup from 'react-addons-css-transition-group' // ES6

const StarButton = React.createClass({
  starPost () {
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
          </CSSTransitionGroup>
          <span key={post.id} className="label-success">
            <strong>{post.stars_count}</strong>
          </span>
        </div>
        <button onClick={this.starPost} className="btn btn-info btn-lg">
          <span className="glyphicon glyphicon-star"></span>
          Star this post
        </button>
      </div>
    )
  }
})

export default StarButton;
