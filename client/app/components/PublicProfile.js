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
    const avatar = this.props.publicPosts[0]? this.props.publicPosts[0].user.gravatar : '';
    return (
      <div className="row">
        <div className="col-lg-9 feed">
          <h2 className="small-title public">{this.props.params.otheruser}'s profile</h2>
          <Link className="btn btn-default" to={{
            pathname: `/message/${this.props.user.username}/${this.props.params.otheruser}`,
            state: avatar
          }}>
            <strong>Message</strong> {this.props.params.otheruser}
          </Link>
          <button className="btn btn-default"><strong>Follow</strong> {this.props.params.otheruser}</button>
          {this.userPosts()}
        </div>
      </div>
    )
  }
}

export default PublicProfile;
