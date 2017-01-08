import React from 'react';
import Post from './Post.js'
import {getPostsByUsername} from '../actions/post_actions.js'


class PublicProfile extends React.Component {
  componentWillMount () {
    this.props.dispatch(getPostsByUsername(this.props.params.username))
  }

  userPosts () {
    return this.props.userPosts.map((post) => {
      return (
        <Post key={post.id} post={post} contextUser={this.props.user.username}/>
      )
    })
  }

  render () {
    return (
      <div>
      <h1>{this.props.params.username}'s profile</h1>
      {this.userPosts()}
      </div>
    )
  }
}

export default PublicProfile