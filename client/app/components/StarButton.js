import React from 'react'
import {Link} from 'react-router'
import CSSTransitionGroup from 'react-addons-css-transition-group' // ES6

class StarButton extends React.Component {
  render() {
    const {post, user} = this.props;
    const starButton = (
      <div className="star-row-container">
        <div className="badge star-container">
          <p className="star-text">Star</p>
          <i className="glyphicon glyphicon-star-empty" onClick={this.props.toggle}></i>
        </div>
        <div>
          <p className="stars-count">
            <strong>{post.stars_count}&nbsp;</strong>people aLike &nbsp; <strong>{post.user.username}&nbsp;</strong>starred this post!
          </p>
        </div>
      </div>
    )

    const unstarButton = (
      <div className="star-row-container">
        <div className="badge star-container starred">
          <p className="star-text">Star</p>
          <i className="glyphicon glyphicon-star" onClick={this.props.toggle}></i>
        </div>
        <div>
          <p className="stars-count">
            <strong>{post.stars_count}&nbsp;</strong>people aLike &nbsp; <strong>{post.user.username}&nbsp;</strong>starred this post!
          </p>
        </div>
      </div>
    )

    const userPostView = (
      <div>
        <p><strong> {post.stars_count}</strong> people alike you starred your post!</p>
      </div>
      //TODO: show user's profile's with link tags.. underneath to click on their posts
    )

    return (
      post.user.username === user.username? userPostView :
      post.isStarred? unstarButton : starButton
    )
  }
}

// offsets = translateX(-50%) translateY(-50%)
// .likes-heart
//   opacity 0
//   transition all 0.5s // time to fade out after its done
//   transform offsets scale(5) // this is the "end state"
//   display block
//   &.like-enter
//     transition all .2s
//     transform offsets scale(1)
//     opacity 1
//     &.like-enter-active
//       transform offsets scale(5)
//   .like-leave-active
//     display none

export default StarButton;
