import React  from 'react'
import Post from './Post.js'
import MatchedPost from './MatchedPost.js'
import {getMatches, clearMatches} from '../actions/match_actions.js'
// import {getPostsByUsername} from '../actions/post_actions.js'

class Matches extends React.Component {
  // constructor(props) {
  //   super()
  //   this.state = {
  //     profilePicture: () => {
  //       if(this.props.post.username) {
  //         return 'http://res.cloudinary.com/isaacxpreston/image/upload/' + this.props.post.username + '.jpg'
  //       }
  //       return 'http://res.cloudinary.com/isaacxpreston/image/upload/' + this.props.post.user.username + '.jpg'
  //     }
  //   }
  // }

  displayCurrent () {
    return this.props.userPosts.filter((post) => {
      return post.id === parseInt(this.props.params.postid)
    }).map((post) => {
      return ( //todo -replace post with custom rendering
        <Post key={post.id} post={post} />
      )
    })
  }

  displayMatches () {
    return this.props.matches.map((match) => {
      return ( //todo -replace this one too
        <MatchedPost key={match.originalPost.id} post={match.originalPost} user={this.props.user} dispatch={this.props.dispatch} compatibilityScore={match.compatibilityScore} />
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
      <div>
        {this.displayCurrent()}
        <hr />
        <h1>Alike-Minded Posts</h1>
        {this.displayMatches()}
        <hr />
      </div>
    )
  }
}

export default Matches