import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import moment from 'moment'
import axios from 'axios'

class Post extends React.Component {

  constructor(props) {
    super()
    this.state = {
      profilePicture: () => {
        if(this.props.post.username) {
          return 'http://res.cloudinary.com/isaacxpreston/image/upload/' + this.props.post.username + '.jpg'
        }
        return 'http://res.cloudinary.com/isaacxpreston/image/upload/' + this.props.post.user.username + '.jpg'
      }
    }
  }

  postStyle () {
    return {margin: '0px 3px 0px 3px',}
  }

  renderTags () {
    return this.props.post.tags.map((tag, index) => {
      return (<Link key={index}><span className="label label-info" style={this.postStyle()}>{tag.name}</span></Link>)
    })
  }

  usernameContext () { //pass session user in instead for better checking
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
    const imgStyle = {
      height: '40px',
      width: '40px',
      borderRadius: '50%',
      border: '2px, solid, #000'
    }

    const handleError = () => {
      this.setState({profilePicture: () => {
        return "http://www.topcareer.jp/inter_blog/wp-content/uploads/100_100_empty.gif"
      }})
    }

    return (
        <div className="panel panel-default">
          <div className="panel-body">
            <Link className="pull-left">
              <img src={this.state.profilePicture()} className="media-photo" style={imgStyle} onError={handleError}/>
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

