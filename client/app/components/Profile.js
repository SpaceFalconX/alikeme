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
    console.log(this.props)
    if(this.props.params.username !== this.props.user.username){
      browserHistory.push('/profile/' + this.props.params.username)
    }
    if(this.props.categories.length === 0) {
      this.props.dispatch(fetchCategories());
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !== this.props) {
      return true;
    }
  }

  render () {
    const posts = this.props.userPosts
    const {followers, following, username} = this.props.user;
    for(let prop in this.props.user) {
      if(this.props.user[prop] === undefined) {
        this.props.user[prop] = [];
      }
    }
    const {personalityMatches} = this.props;
    return (
        <div className="col-md-10" >
         <div className="row" >
            <div className="col-md-8">
              <NewPostForm {...this.props} />
              {
                posts.map((post) => {
                  return (
                    <Post key={post.id} post={post} />
                  )
                }).reverse()
              }
            </div>
            <div className="col-md-4">
              <h4>Following</h4>
              { 
                this.props.user.following.map((follower, index)=>{
                  return (<FollowThumb router={this.props.router} key={index} follower={follower}
                    personalityMatches={this.props.personalityMatches} />)
                })
              }
              <h4>Followers</h4>
              {
                this.props.user.followers.map((follower, index)=>{
                  return (<FollowThumb router={this.props.router}key={index} follower={follower}
                    personalityMatches={this.props.personalityMatches} />)
                })
              }
            </div>
          </div>
      </div>
    )

  }
}

export default Profile;
