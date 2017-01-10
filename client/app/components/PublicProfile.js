import React from 'react';
import Post from './Post.js'
import {fetchPublicPostsFromDb} from '../actions/post_actions.js'


class PublicProfile extends React.Component {
  componentWillMount () {
    console.log("pROPS", this.props.params.username)
    this.props.dispatch(fetchPublicPostsFromDb(this.props.params.username))
  }
  userPosts () {
    return this.props.publicPosts.map((post) => {
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