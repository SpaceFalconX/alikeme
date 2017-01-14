import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import moment from 'moment'
import axios from 'axios'
import StarButton from './StarButton.js'
import UserPic from './userPicture.js'

class Post extends React.Component {

  postStyle () {
    return {margin: '0px 3px 0px 3px',}
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
    if(this.props.user.username !== this.props.post.user.username) {
      return (
        <Link to={'/profile/' + this.props.post.user.username}> click to view
        {this.props.post.username}'s profile</Link>
      )
    }
    return (
      <Link to={'/matches/' + this.props.post.id}> click to view matches and edit</Link>
    )
  }

  render () {
    return (
        <div className="panel panel-default">
          <div className="panel-body">
            <Link className="pull-left">
              <UserPic username={this.props.post.user.username} />
            </Link>
            <span className="pull-right"><em>
            { moment(this.props.post.created_at).calendar() }
            </em></span>
            <div className="media-body">
              <h4 className="list-group-item-heading">{this.props.post.title}</h4>
              <p className="list-group-item-text"><b>{this.props.post.content}</b></p>
              <p><i>-{this.props.post.user.username}</i></p>
              <p>{this.matchORViewContext()}</p>
            </div>
          <div>
            <StarButton {...this.props} />
          </div>
          <div className="panel-body">
            <span className="glyphicon glyphicon-tags" aria-hidden="true" style={this.postStyle()}></span>
            <span>{this.renderTags()}</span>
            <span> Posted in
              <Link className="badge">{this.props.post.category.name}</Link>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Post;

