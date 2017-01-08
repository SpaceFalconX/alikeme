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
        <Post key={post.id} post={post} />
      )
    })
  }
  render () {
    console.log(this.props) //needs an id to match with username
    return (
      <div>
      <h1>{this.props.params.username}'s profile</h1>
      look at all this stuff
      {this.userPosts()}
      </div>
    )
  }
}

export default PublicProfile