import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import Seed from '../../seed.js'

class InterestEntry extends React.Component {
  postStyle () {
    return {margin: '0px 3px 0px 3px',}
  }

  renderTags () {
    return this.props.post.tags.map((tag, index) => {
      return (<Link key={index}><span className="label label-info" style={this.postStyle()}>{tag.name}</span></Link>)
    })
  }

  render () {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <Link className="pull-left">
            <img src="http://2.bp.blogspot.com/-5nGzg5T-9qA/T6ZbL9JF0iI/AAAAAAAACF8/TvTnURwsNb0/s1600/anonymous3.png"
             style={{height: '10%',}} className="media-photo" />
          </Link>
          <div className="media-body">
            <h4 className="list-group-item-heading">{this.props.post.title}</h4>
            <p className="list-group-item-text">{this.props.post.content}</p>
          </div>
        </div>
        <div className="panel-body">
          <span className="glyphicon glyphicon-user" aria-hidden="true" style={this.postStyle()}></span>
          <Link>{this.props.post.user.username}</Link>
          | <span className="glyphicon glyphicon-calendar" aria-hidden="true" style={this.postStyle()}></span>
            <span>{this.props.post['created_at']}</span>
          | <span className="glyphicon glyphicon-share" aria-hidden="true" style={this.postStyle()}> </span>
            <Link>39 Shares</Link>
          | <span className="glyphicon glyphicon-tags" aria-hidden="true" style={this.postStyle()}></span>
            <span>{this.renderTags()}</span>
          | <span>Posted in <Link className="badge">{this.props.post.category.name}</Link></span>
        </div>
      </div>
    )
  }
}

export default InterestEntry;

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


