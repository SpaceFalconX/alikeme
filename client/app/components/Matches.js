import React  from 'react'
import Post from './Post.js'
import MatchedPost from './MatchedPost.js'
import {getMatches, clearMatches} from '../actions/match_actions.js'

class Matches extends React.Component {
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
    return this.props.matches.map((match, index) => {
      return ( //todo -replace this one too
        <MatchedPost key={index} post={match} user={this.props.user}
         dispatch={this.props.dispatch} params={this.props.params}
        compatibilityScore={match.compatibilityScore} />
      )
    })
  }

  componentWillUnmount () {
    this.props.dispatch(clearMatches())
  }

  render () {
    if(this.props.userPosts.length > 0 && this.props.matches.length === 0) {
      let post = this.props.userPosts.filter((p) => {
        return p.id === parseInt(this.props.params.postid)
      })[0]
      let agreeableness = this.props.user.agreeableness
      let conscientiousness = this.props.user.conscientiousness
      let emotionalRange = this.props.user.emotionalRange
      let extraversion = this.props.user.extraversion
      let openness = this.props.user.openness
      this.props.dispatch(getMatches({post, agreeableness, conscientiousness, emotionalRange, extraversion, openness}))
    }

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

export default Matches