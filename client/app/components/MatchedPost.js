import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import moment from 'moment'
import StarButton from './StarButton.js'
import {toggleStar} from '../actions/post_actions.js'

class MatchedPost extends React.Component {
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
      return (<Link key={tag.id}><span className="label label-info"
        style={this.postStyle()}>{tag.name}</span></Link>)
    })
  }

  render () {
    const MEDIA_BODY = {
      paddingLeft: 'inherit',
      paddingTop: 'inherit'
    }
    const POST_CSS = {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s'
    }
    const imgStyle = {
      height: '60px',
      width: '60px',
      borderRadius: '50%',
      border: '2px, solid, #000'
    };
    const { user, created_at, content, title, stars, category } = this.props.post;
    const traits = [ 'openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotionalRange' ];
    return (
      <div className="post-content-container">
        <div className="panel panel-default" style={POST_CSS}>
          <div className="panel-body">
            <Link to={'/profile/' + this.props.user.username +'/' + user.username} className="pull-left post-heading">
              <img src={user.gravatar} className="post-image" style={imgStyle} />
              <span className="post-username"><em>@{user.username}</em></span>
            </Link>
            <div className="pull-right right-post-container">
                <span className="date"><em>{ moment(created_at).calendar() }</em></span>
              <div className="match-container">
                <span className="match-text">
                  {((5 - this.props.compatibilityScore)/5 * 100).toFixed()}% Match
                </span>
              </div>
            </div>
            <div className="media-body" style={MEDIA_BODY}>
              <h4 className="list-group-item-heading post-title">{title}</h4>
              <p className="list-group-item-text post-text">{content}</p>
            </div>
            <div className="panel-body meta">
              <span className="glyphicon glyphicon-tags" aria-hidden="true" style={this.postStyle()}></span>
              <span>&nbsp;{this.renderTags()}</span>
              <span> Posted in &nbsp;
                <Link className="badge" style={this.postStyle()}> {category.name} </Link>
              </span>
            </div>
          </div>
          <div className="panel-footer">
            <StarButton toggle={this.toggle.bind(this)} {...this.props} />
          </div>
        </div>
      </div>

    )
  }
}

export default MatchedPost;
