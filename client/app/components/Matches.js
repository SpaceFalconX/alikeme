import React  from 'react'
import Post from './Post.js'
import MatchedPost from './MatchedPost.js'
import {getMatches, clearMatches, updateStarredPostsMatches} from '../actions/match_actions.js'
// import {updateStarredPostsMatches, fetchPostsFromDb} from '../actions/post_actions.js'

class Matches extends React.Component {
  componentWillMount () {
    const { dispatch, params } = this.props;
    dispatch(getMatches(params.postid))
    .then(()=> {
      const filtered = [];
      this.props.matches.forEach((match) => {
        match.stars.forEach((star) => {
          if(star.id === this.props.user.id) {
            filtered.push(match.id)
          }
        })
      })
      console.log(filtered)
      this.props.dispatch(updateStarredPostsMatches(filtered))
      // if(this.props.user.id === this.props.post.stars.id) {
      //   this.props.dispatch(updateStarredPostsMatches());
      // }
    })
  }

  componentWillUnmount () {
    this.props.dispatch(clearMatches())
  }

  displayCurrent () {
    const { params, userPosts, dispatch, user } = this.props;
    return userPosts
    .filter((post) =>  post.id === parseInt(params.postid))
    .map((post) =>
      (
        <Post dispatch={dispatch} key={post.id}
        user={user} post={post} params={params} />
      )
    )
  }

  displayMatches () {
    const { matches, dispatch, user, params, distance } = this.props;
    return matches.map((match, index) => {
      return ( //todo -replace this one too
        <MatchedPost key={match.id} post={match} user={user}
         dispatch={dispatch} params={params}
        compatibilityScore={match.distance} />
      )
    })
  }



  render () {

    return (
      <div className="col-md-10 space">
        <div className="row">
          <div className="col-md-8">
            {this.displayCurrent()}
          <hr />
          <h1>Alike-Minded Posts</h1>
            {this.displayMatches()}
          <hr />
          </div>
        </div>
      </div>
    )
  }
}

export default Matches;
