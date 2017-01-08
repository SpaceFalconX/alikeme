import React from 'react';
import Post from './Post.js'
import {connect} from 'react-redux';
import { filterFeed } from '../actions/auth_actions.js'
import { fetchPostsFromDb, fetchUserPostsFromDb} from '../actions/post_actions.js'


class Browse extends React.Component {
  constructor(props) {
    super()
    this.state = {
      searchTerm : ''
    }
  }

  filter (e) {
    e.preventDefault()
    this.setState({searchTerm:this.refs.search.value})
    this.refs.search.value = "";
  }

  componentWillMount() {
    this.props.dispatch(fetchPostsFromDb())
  }

  render () {
    console.log(this.props)
    let sorted = this.props.allPosts.sort((a,b) => {
      return a.id < b.id
    })
    return (
      <div className="col-md-6" >
        <h1>browse</h1>
            <div className="input-group">
              <span>search</span>
              <form onSubmit={this.filter.bind(this)}>
              <input ref='search' placeholder='filter by category' type="text" />
              <button>search</button>
              </form>
            </div>
            <div className="list-group">
              { sorted.map((post) => {
                  return (
                    <Post key={post.id} post={post} contextUser={this.props.user.username} />
                  )
                })
              }
            </div>
      </div>
    )
  }
}

export default Browse;