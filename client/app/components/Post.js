import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import moment from 'moment'

class Post extends React.Component {
  postStyle () {
    return {margin: '0px 3px 0px 3px',}
  }

  renderTags () {
    return this.props.post.tags.map((tag, index) => {
      return (<Link key={tag.id}><span className="label label-info" style={this.postStyle()}>{tag.name}</span></Link>)
    })
  }

  usernameContext () { //pass session user in instead for better checking
    if(this.props.post.username) {
      return this.props.post.username
    }
    return this.props.post.user.username
  }

  matchORViewContext () {
    //fix logic here! doesn't work with public profiles
    if(this.props.contextUser && this.props.contextUser !== this.usernameContext()) {
      //go to public post, or just stay here for now
      return (
        <Link to={'/profile/' + this.usernameContext()}> click to view {this.usernameContext()}'s profile</Link>
      )
    }
    //go to matches post
    //matches post will also have an edit link
    return (
      <Link to={'/' + this.usernameContext()}> click to view your profile</Link>
    )
  }

  render () {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <Link className="pull-left">
            <img src="#" className="media-photo" />
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
          | <span>Posted in <Link className="badge">{this.props.post.category.name}</Link></span>
        </div>
      </div>
    )
  }
}

export default Post;

  // doSomething (username) {
  //   if (this.props.context === "edit") {
  //     browserHistory.push('/editInterest/' + this.props.id)
  //   }
  //  if (this.props.context === "view") {
  //     browserHistory.push('/viewInterest/' + this.props.id)
  //  }
  //  if(this.props.context === "navToProfile") {
  //     browserHistory.push('/profile/' + username)
  //  }
  // }
    // current = this.props.posts.filter((entry) => {
    //   return parseInt(entry.post_id) === parseInt(this.props.id)
    // })[0]

    // if(!current){ //check seed js
    //   current = Seed.interests.filter((entry) => {
    //     return entry.post_id === parseInt(this.props.id)
    //   })[0]
    // }


