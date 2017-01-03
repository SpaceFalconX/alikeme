import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Seed from '../../seed.js'

class InterestEntry extends React.Component {
  
  doSomething (username) {
    if (this.props.context === "edit") {
      browserHistory.push('/editInterest/' + this.props.id)
    }
   if (this.props.context === "view") {
      browserHistory.push('/viewInterest/' + this.props.id)
   }
   if(this.props.context === "navToProfile") {
      browserHistory.push('/profile/' + username)
   }
  }

  render () {

    let current;

    current = this.props.posts.filter((entry) => {
      return entry.post_id === parseInt(this.props.id)
    })[0]

    if(!current){ //check seed js
      current = Seed.interests.filter((entry) => {
        return entry.post_id === parseInt(this.props.id)
      })[0]
    }

    console.log(current.username)
    
    return (
      <div onClick={this.doSomething.bind(this, current.username)}>
        <h3>{current.title}</h3>
        <p>{current.content}</p>
        <p><small>Categories:</small> {current.category.join(", ")}</p>
        <p>@{current.username}</p>
        <p><small>{current.post_id}</small></p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.userPosts
  };
}

export default connect(mapStateToProps)(InterestEntry)