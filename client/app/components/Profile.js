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
  componentWillMount () {
    if(this.props.categories.length === 0) {
      this.props.dispatch(fetchCategories());
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      return true;
    }
  }

  render () {
    const followStyle = {
      height: 400,
      overflow: 'scroll'
    }
    const posts = this.props.userPosts
    const {followers, following, username} = this.props.user;
    for(let prop in this.props.user) {
      if(this.props.user[prop] === undefined) {
        this.props.user[prop] = [];
      }
    }
    const {personalityMatches, user, dispatch, params} = this.props;
    return (
        <div className="col-md-10 space" >
         <div className="row" >
            <div className="col-md-8">
              <NewPostForm {...this.props} />
              {
                posts.map((post, index) => {
                  return (
                    <Post dispatch={dispatch} personalityMatches={personalityMatches}
                    user={user} key={index} post={post} params={params} />
                  )
                }).reverse()
              }
            </div>
            <div className="col-md-4">

              <h4>Following ({this.props.user.following.length})</h4>
                <div style={followStyle}>
                  {
                    this.props.user.following.map((follower, index)=>{
                      return (<FollowThumb router={this.props.router} key={index} follower={follower}
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
      </div>
    )

  }
}

export default Profile;
