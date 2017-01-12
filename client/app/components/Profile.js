import React from 'react';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
import Post from './Post.js'
import NewPostForm from './NewPost.js'
import {fetchUserPostsFromDb} from '../actions/post_actions.js'
import {fetchCategories} from '../actions/category_actions.js'
import _ from 'underscore'

class Profile extends React.Component {
  componentWillMount () {
    if(this.props.params.username !== this.props.user.username){
      browserHistory.push('/profile/' + this.props.params.username)
    }
    if(this.props.categories.length === 0) {
      this.props.dispatch(fetchCategories());
    }
  }

  render () {
    console.log('RENDER USER POSTS FROM PROFILE', this.props.userPosts)
    const posts = this.props.userPosts
    let sorted = _.sortBy(posts, 'id')
    return (
      <div className="col-md-6">
        <NewPostForm {...this.props} />
        <div className="container">
          {
            posts.map((post) => {
              return (
                <Post key={post.id} post={post} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Profile;