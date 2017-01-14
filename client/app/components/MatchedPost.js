import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import moment from 'moment'
import UserPic from './userPicture.js'
import StarButton from './StarButton.js'

class MatchedPost extends React.Component {
  postStyle () {
    return {margin: '0px 3px 0px 3px',}
  }

  renderTags () {
    return this.props.post.tags.map((tag, index) => {
      return (<Link key={index}><span className="label label-info"
        style={this.postStyle()}>{tag.name}</span></Link>)
    })
  }

  render () {
    return (
        <div className="panel panel-default">
          <div className="panel-body">
            <Link className="pull-left">
              <UserPic username={this.props.post.user.username} />
            </Link>
            <span className="pull-right">
              <em>
                { moment(this.props.post.created_at).calendar() }
              </em>
              <p>{((5 - this.props.compatibilityScore)/5 * 100).toFixed()}% Personality Match</p>
            </span>
            <div className="media-body">
              <h4 className="list-group-item-heading">{this.props.post.title}</h4>
              <p className="list-group-item-text"><b>{this.props.post.content}</b></p>
              <p><i>-{this.props.post.user.username}</i></p>
              <Link to={'/profile/' + this.props.post.user.username}>
              click to view {this.props.post.user.username}'s profile</Link>
            </div>
          </div>
          <div>
            <StarButton {...this.props} />
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

export default MatchedPost;

