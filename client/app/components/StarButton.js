import React from 'react'
import {Link} from 'react-router'
import CSSTransitionGroup from 'react-addons-css-transition-group' // ES6

class StarButton extends React.Component {
  // constructor(props) {
  //   super();
  //   this.state = { toggleStar: true}
  // }
  componentWillMount() {

  }

  toggle (e) {
    const {post, user} = this.props;
    this.props.dispatch(incrementStars(post.id, user.id, flag))
    .then(() => {

    })

  }

  render() {
    const {post, user} = this.props;
    //TODO: Add some conditional on rendering star button
    const starButton = (
      <span onClick={this.toggle.bind(this)}>
        <i className="glyphicon glyphicon-star">
          <strong> {post.stars_count}</strong>
        </i>
      </span>
    )

    const unstarButton = (
      <span onClick={this.toggle.bind(this)}>
        <i className="glyphicon glyphicon-heart">
          <strong> {post.stars_count}</strong>
        </i>
      </span>
    )

    const userPostView = (
      <div>
        <p><strong> {post.stars_count}</strong> people alike you starred your post!</p>
      </div>
      //TODO: show user's profile's with link tags.. underneath to click on their posts
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
        {post.user.username === user.username? userPostView : starButton}
      </div>
    )
  }
}

export default StarButton;
