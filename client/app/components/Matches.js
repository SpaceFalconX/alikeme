import React  from 'react'
import Post from './Post.js'
import MatchedPost from './MatchedPost.js'
import {getMatches, clearMatches} from '../actions/match_actions.js'

class Matches extends React.Component {
  componentWillMount () {
    const { dispatch, params } = this.props;
    dispatch(getMatches(params.postid));
  }

  componentWillUnmount () {
    this.props.dispatch(clearMatches())
  }

  displayCurrent () {
    return this.props.userPosts.filter((post) => {
      return post.id === parseInt(this.props.params.postid)
    }).map((post) => {
      return (
        <Post dispatch={this.props.dispatch} key={post.id}
        user={this.props.user} post={post} params={this.props.params} />
      )
    })
  }

  displayMatches () {
    const { matches, dispatch, user, params, distance } = this.props;
    return matches.map((match, index) => {
      return ( //todo -replace this one too
        <MatchedPost key={index} post={match} user={user}
         dispatch={dispatch} params={params}
        compatibilityScore={match.distance} />
      )
    })
  }


  render () {

    return (
      <div className="col-md-10">
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
