import React from 'react';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
import Post from './Post.js'
import NewPostForm from './NewPost.js'
import FollowThumb from './FollowThumb.js'
import {fetchUserPostsFromDb} from '../actions/post_actions.js'
import {fetchCategories} from '../actions/category_actions.js'
//import {getFollowers, getFollowing} from '../actions/auth_actions.js'
import _ from 'lodash'

class Profile extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      return true;
    }
    return false;
  }

  render () {
    const followStyle = {
      height: 400,
      overflow: 'scroll'
    }
    const posts = this.props.userPosts
    const {followers, following, username} = this.props.user;
    const {personalityMatches, user, dispatch, params} = this.props;
    return (
         <div className="row">
            <div className="col-lg-9 feed">
              <NewPostForm {...this.props} />
              {
                posts.map((post, index) => {
                  return (
                    <Post dispatch={dispatch} personalityMatches={personalityMatches}
                    user={user} key={post.id} post={post} params={params} />
                  )
                }).reverse()
              }
            </div>
            <div className="col-lg-3">
              <h4>Following ({this.props.user.following.length})</h4>
                <div style={followStyle}>
                  {
                    this.props.user.following.map((follower, index)=>{
                      return (<FollowThumb router={this.props.router} key={follower.id} follower={follower}
                        personalityMatches={this.props.personalityMatches} />)
                    })
                  }
                </div>
              <h4>Followers ({this.props.user.followers.length})</h4>
              <div style={followStyle}>
                {
                  this.props.user.followers.map((follower, index)=>{
                    return (<FollowThumb router={this.props.router} key={index} follower={follower}
                      personalityMatches={this.props.personalityMatches} />)
                  })
                }
              </div>
            </div>
          </div>
    )

  }
}

Profile.defaultProps = {
  user: {
    following: [],
    followers: []
  }
}

export default Profile;
