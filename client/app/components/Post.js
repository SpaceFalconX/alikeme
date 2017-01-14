import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import moment from 'moment'
import axios from 'axios'
import UserPic from './userPicture.js'

class Post extends React.Component {
  
  postStyle () {
    return {margin: '0px 3px 0px 3px',}
  }

  renderTags () {
    return this.props.post.tags.map((tag, index) => {
      return (<Link key={index}><span className="label label-info" style={this.postStyle()}>{tag.name}</span></Link>)
    })
  }

  usernameContext () {
    if(this.props.post.username) {
      return this.props.post.username
    }
    return this.props.post.user.username
  }

  matchORViewContext () {
    if(this.props.contextUser && this.props.contextUser !== this.usernameContext()) { 
      return (
        <Link to={'/profile/' + this.usernameContext()}> click to view {this.usernameContext()}'s profile</Link>
      )
    }
    return (
      <Link to={'/matches/' + this.props.post.id}> click to view matches and edit</Link>
    )
  }

  render () {
    const POST_CSS = {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s'
    }

    return (
        <div className="panel panel-default" style={POST_CSS}>
          <div className="panel-body">
            <Link className="pull-left">
              <UserPic username={this.usernameContext()} />
            </Link>
            <span className="pull-right"><em>
            { moment(this.props.post.created_at).calendar() }
            </em></span>
            <div className="media-body">
              <h4 className="list-group-item-heading">{this.props.post.title}</h4>
              <p className="list-group-item-text"><b>{this.props.post.content}</b></p>
              <p><i>-{this.usernameContext()}</i></p>
              <p>{this.matchORViewContext()}</p>
            </div>
          </div>
          <div className="panel-body">
            <span className="glyphicon glyphicon-tags" aria-hidden="true" style={this.postStyle()}></span>
            <span>{this.renderTags()}</span>
            <span>Posted in <Link className="badge">{this.props.post.category.name}</Link></span>
          </div>
        </div>
    )
  }
}

export default Post;

