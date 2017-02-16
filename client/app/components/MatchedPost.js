import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import moment from 'moment'
import UserPic from './userPicture.js'
import StarButton from './StarButton.js'
import {toggleStar} from '../actions/post_actions.js'

class MatchedPost extends React.Component {
  postStyle () {
    return {margin: '0px 3px 0px 3px',}
  }

  toggle (e) {
    const {post, user} = this.props;
    const {isStarred} = post;
    console.log('TOGGLE', isStarred)
    this.props.dispatch(toggleStar(post.id, user.id, isStarred))
  }

  renderTags () {
    return this.props.post.tags.map((tag, index) => {
      return (<Link key={tag.id}><span className="label label-info"
        style={this.postStyle()}>{tag.name}</span></Link>)
    })
  }

  render () {
    const MEDIA_BODY = {
      paddingLeft: 'inherit',
      paddingTop: 'inherit'
    }
    const { user, created_at, content, title, stars, category } = this.props.post;
    const traits = [ 'openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotionalRange' ];
    return (
        <div className="panel panel-default">
          <div className="panel-body">
            <Link className="pull-left">
              <UserPic username={user.username} />
            </Link>
            <span className="pull-right">
              <em>{ moment(created_at).calendar() }</em>
              <p>{((5 - this.props.compatibilityScore)/5 * 100).toFixed()}% Personality Match</p>
            </span>
            <div className="media-body" style={MEDIA_BODY}>
              <h4 className="list-group-item-heading">{title}</h4>
              <p className="list-group-item-text"><b>{content}</b></p>
              <p><i>-{user.username}</i></p>
              <Link to={'/profile/' + user.username}>
              click to view {user.username}s profile</Link>
            </div>
          </div>
          <div style={this.postStyle()}>
            <StarButton toggle={this.toggle.bind(this)} {...this.props} />
            Starrs:
            {stars.map((user) =>  (
              <span key={user.username}><strong>{user.username} </strong></span>
            ))}
          </div>
          <div>
            Personality profile:
            {traits.map((trait) => (
              <div>{`${trait}: ${user[trait]}`}</div>
            ))}
          </div>
          <div className="panel-body">
            <span className="glyphicon glyphicon-tags" aria-hidden="true" style={this.postStyle()}></span>
            <span>{this.renderTags()}</span>
            <span>Posted in <Link className="badge">{category.name}</Link></span>
          </div>
        </div>
    )
  }
}

export default MatchedPost;
