import React  from 'react'
import Post from './Post.js'

class Matches extends React.Component {
  displayCurrent () {
    return this.props.userPosts.filter((post) => {
      return post.id === parseInt(this.props.params.postid)
    }).map((post) => {
      return ( //todo -replace post with custom rendering
        <Post key={post.id} post={post} />
      )
    })
  }
  
  render () {
    return (
      <div>
        <h1>Matches for post #{this.props.params.postid}</h1>
        {this.displayCurrent()}
      </div>
    )
  }
}

export default Matches