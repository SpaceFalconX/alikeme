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
    if(this.props.params.username !== this.props.user.username){
      browserHistory.push('/profile/' + this.props.params.username)
    }
    if(this.props.categories.length === 0) {
      this.props.dispatch(fetchCategories());
    }
  }

  displayFollowers () {
    if(this.props.user.followers) {
      return this.props.user.followers.map((follower, index)=>{
        return (<FollowThumb router={this.props.router} key={index} follower={follower}
          personalityMatches={this.props.personalityMatches} />)
      })
    } else {
      return (
        <div> LOADING </div>
      )
    }
  }

  displayFollowing () {
    if (this.props.user.following) {
      return this.props.user.following.map((follower, index)=>{
        return (<FollowThumb router={this.props.router}key={index} follower={follower}
          personalityMatches={this.props.personalityMatches} />)
      })
    } else {
      return (
        <div> LOADING </div>
      )
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   const {followers, following, username} = this.props.user;
  //   if(posts.length && followers.length && following.length) {
  //     this.props.fetched = true;
  //   }
  // }



  render () {

    const posts = this.props.userPosts
    const {followers, following, username} = this.props.user;
    console.log("FOLLOWERS")
    const {personalityMatches} = this.props;
    // if(!posts.length || !followers.length || !following.length || !categories.length ) {
    //   return (<div>LOADING</div>)
    // } else {
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
                })
              }
            </div>
            <div className="col-md-4">
              <h4>Following</h4>
              {this.displayFollowers()}
              <h4>Followers</h4>
              {this.displayFollowing()}
            </div>
          </div>
      </div>
    )

  }
}

export default Profile;


// class ProfileComponent extends React.Component {

//   constructor (props) {
//     super()
//     this.state = {
//       toggle: 'Interest'
//     }
//   }
// return (<FollowThumb key={index} dispatch={this.props.dispatch}
//                   otherUser={otherUser} user={this.props.user} router={this.props.router} />)
// //   toggle () {
//     this.state.toggle === 'Interest' ?
//     this.setState({toggle: 'Entry'}) :
//     this.setState({toggle: 'Interest'})
//   }

//   createNewPost () {
//     if (this.state.toggle === 'Interest') {
//       return (
//         <div>
//           <NewInterest />
//           <h4 onClick={this.toggle.bind(this)}>switch to entry</h4>
//         </div>
//       )
//     } else {
//       return (
//         <div>
//           <NewEntry />
//           <h4 onClick={this.toggle.bind(this)}>switch to interest</h4>
//         </div>
//       )
//     }
//   }

//   profilePicture () {
//     if (!this.props.user.profilePicture) { //fix later
//       return (
//         <i className ="fa fa-user-o fa-5x"></i>
//       )
//     } else {
//       return (
//         <img src={this.props.user.profilePicture}  />
//       )
//     }
//   }

//   editOrView () {
//     //todo
//     //add method to check if user exists
//     //add user not found render

//     if(this.props.user.username !== this.props.params.username) {
//       return (
//         <div>
//           <h1>{this.props.params.username}'s Profile</h1>
//           {this.profilePicture()}
//           <br />
//           <button className="btn btn-primary">Message {this.props.params.username}</button>
//           <h2>{this.props.params.username}'s posts</h2>
//           <Interests username={this.props.params.username} / >
//         </div>
//       )
//     } else {
//       return (
//         <div>
//           <h1>Your Profile</h1>
//           {this.profilePicture()}
//           <h2>create a new {this.state.toggle}</h2>
//           {this.createNewPost()}
//           <h2>my posts</h2>
//           <Interests username={this.props.params.username} / >
//         </div>
//       )
//     }
//   }

//   render () {
//     return (
//       <div>
//         {this.editOrView()}
//       </div>
//     )
//   }
// }
