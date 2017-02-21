import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import moment from 'moment'
import axios from 'axios'
import UserPic from './UserAvatar.js'
import StarButton from './StarButton.js'
import {toggleStar} from '../actions/post_actions.js'
import {followClick} from '../actions/auth_actions.js'


class Post extends React.Component {
  followUser(id) {
    this.props.dispatch(followClick(this.props.user.id, id))
  }

  isFollowing () {
    const {user, post} = this.props;
    return user.following.some(user => user.id === post.user.id);
  }

  isFollowed() {
    const {user, post} = this.props;
    return user.followers.some(user => user.id === post.user.id);
  }

  displayFollowButton() {
    const {id, user} = this.props.post;
    if(!this.isFollowing()) {
      return (
        <div className="badge star-container follow-post not-following">
          <p className="star-text">Follow</p>
          <i className="glyphicon glyphicon-plus"></i>
          <i className="glyphicon glyphicon-user"></i>
          <p className="star-text emphasis" onClick={() => this.followUser(id)}>{user.username}</p>
        </div>
      )
    } else {
      return (
        <div className="badge star-container follow-post following">
          <p className="star-text">Following</p>
          <i className="glyphicon glyphicon-user"></i>
          <p className="star-text emphasis">{user.username}</p>
        </div>
      )
    }
  }

  postStyle () {
    return {margin: '0px 3px 0px 3px',}
  }

  toggle (e) {
    const {post, user} = this.props;
    const {isStarred} = post;
    this.props.dispatch(toggleStar(post.id, user.id, isStarred))
  }

  renderTags () {
    return this.props.post.tags.map((tag, index) => {
      if(tag.name) {
        tag = tag.name
      }
      return (
        <Link key={index}><span className="label label-info"
          style={this.postStyle()}>{tag}</span>
        </Link>
      );
    })
  }

  matchORViewContext () {
    const { post, user, params } = this.props;
    if(params.username !== user.username) {
      return ( <span>MATCH ME UP!</span> )
    } else if (user.username !== post.user.username) {
      return '/profile/' + user.username +'/' + post.user.username
    }
    return '/matches/' + user.username + '/' + post.id;
  }

  render () {
    const POST_CSS = {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s'
    }

    const MEDIA_BODY = {
      paddingLeft: 'inherit',
      paddingTop: 'inherit'
    }

    const {post, user} = this.props;

    return (
      <div className="post-content-container">
        <div className="panel panel-default" style={POST_CSS}>
          <div className="panel-body">
            <Link to={this.matchORViewContext()} className="pull-left post-heading">
              <UserPic className="post-image" username={post.user.username} />
              <span className="post-username"><em>@{post.user.username}</em></span>
            </Link>
            <span className="pull-right"><em>
            { moment(post.created_at).calendar() }
            </em></span>
            <div className="media-body" style={MEDIA_BODY}>
              <h4 className="list-group-item-heading post-title">{post.title}</h4>
              <p className="list-group-item-text post-text">{post.content}</p>
            </div>
            <div className="panel-body meta">
              <span className="glyphicon glyphicon-tags" aria-hidden="true" style={this.postStyle()}></span>
              <span>&nbsp;{this.renderTags()}</span>
              <span> Posted in &nbsp;
                <Link className="badge" style={this.postStyle()}> {post.category.name} </Link>
              </span>
            </div>
          </div>
          <div className="panel-footer">
            <StarButton toggle={this.toggle.bind(this)} {...this.props} />
            <div>
              {this.displayFollowButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Post;
