import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Seed from '../../seed.js'

class InterestEntry extends React.Component {
  
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
  renderTags () {
    this.props.posts.tags.map((tag, index) => {
      return (<div key={index}>{this.renderTag}</div>)
    })
  }

  render () {
    let current;

    // current = this.props.posts.filter((entry) => {
    //   return parseInt(entry.post_id) === parseInt(this.props.id)
    // })[0]

    // if(!current){ //check seed js
    //   current = Seed.interests.filter((entry) => {
    //     return entry.post_id === parseInt(this.props.id)
    //   })[0]
    // }

    return (
      <div>
        <h3>{this.props.post.title}</h3>
        <p>{this.props.post.content}</p>
        <p><small>Category</small> {this.props.post['category_name']}</p>
        <p>@{this.props.post.author}</p>
        <p><small>
          {this.renderTags}</small></p>
      </div>
    )
  }
}

export default InterestEntry;
