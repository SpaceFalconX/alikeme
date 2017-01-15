import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import moment from 'moment'
import axios from 'axios'
import UserPic from './userPicture.js'
import StarButton from './StarButton.js'
import {toggleStar} from '../actions/post_actions.js'

class Post extends React.Component {

  postStyle () {
    return {margin: '0px 3px 0px 3px',}
  }

  toggle (e) {
    const {post, user} = this.props;
    const {isStarred} = post;
    this.props.dispatch(incrementStars(post.id, user.id, isStarred))
    .then(() => {
      console.log("isStarred afsdfsdfter", isStarred)
    })
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
    if(this.props.params.username !== this.props.user.username) {
      return ( <span>MATCH ME UP!</span> )
    } else if (this.props.user.username !== this.props.post.user.username) {
      return ( <Link to={'/profile/' + this.props.post.user.username}>
              click to view {this.props.post.username}'s profile</Link> )
    }
    return ( <Link to={'/matches/' + this.props.post.id}>
            click to view matches and edit</Link> )
// =======
//     if(this.props.post.user.username !== this.props.user.username) {
//       return (
//         <Link to={'/profile/' + this.props.post.user.username}> click to view {this.props.post.user.username}'s profile</Link>
//       )
//     } else {
//       return (
//         <Link to={'/matches/' + this.props.post.id}> click to view matches and edit</Link>
//       )
//     }
// >>>>>>> styling
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

    return (
        <div className="panel panel-default" style={POST_CSS}>
          <div className="panel-body">
            <Link className="pull-left">
              <UserPic username={this.props.post.user.username} />
            </Link>
            <span className="pull-right"><em>
            { moment(this.props.post.created_at).calendar() }
            </em></span>
            <div className="media-body" style={MEDIA_BODY}>
              <h4 className="list-group-item-heading">{this.props.post.title}</h4>
              <p className="list-group-item-text"><b>{this.props.post.content}</b></p>
              <p><i>- {this.props.post.user.username}</i></p>
              <p>{this.matchORViewContext()}</p>
            </div>

          <div>
            <StarButton toggle={this.toggle.bind(this)} {...this.props} />
          </div>

          <div className="panel-body">
            <span className="glyphicon glyphicon-tags" aria-hidden="true" style={this.postStyle()}></span>
            <span>{this.renderTags()}</span>
            <span> Posted in
              <Link className="badge" style={this.postStyle()}> {this.props.post.category.name} </Link>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Post;

