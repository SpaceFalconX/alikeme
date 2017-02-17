import React from 'react';
import Post from './Post.js'
import {Link} from 'react-router'
import {fetchPublicPostsFromDb} from '../actions/post_actions.js'


class PublicProfile extends React.Component {
  componentWillMount () {
    this.props.dispatch(fetchPublicPostsFromDb(this.props.params.otheruser))
  }

  userPosts () {
    const {personalityMatches, user, params, dispatch} = this.props;
    return this.props.publicPosts.map((post) =>
      ( <Post personalityMatches={personalityMatches} user={user} params={params}
        dispatch={dispatch} key={post.id} post={post} />
      )
    )
  }

  render () {
    return (
      <div className="col-md-6 space">
      <h1>{this.props.params.username}s profile</h1>
      <Link className="btn btn-default" to={'/message/' + this.props.user.username + '/' + this.props.params.username}>MESSAGE {this.props.params.username}</Link>
      <button className="btn btn-default">FOLLOW {this.props.params.username}</button>
      {this.userPosts()}
      </div>
    )
  }
}

export default PublicProfile
