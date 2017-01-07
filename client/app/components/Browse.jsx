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

  componentWillUnmount() {
    this.props.dispatch(fetchUserPostsFromDb(this.props.user.id))
  }

  render () {
    return (
      <div  className="list-group">
        <h1>browse</h1>
            <div className="input-group">
              <span>search</span>
              <form onSubmit={this.filter.bind(this)}>
              <input ref='search' placeholder='filter by category' type="text" />
              <button>search</button>
              </form>
            </div>
            <div className='container'>
              {this.props.posts.map((post) => {
                return (
                  <Post key={post.id} post={post} />
                )})
              }
            </div>
      </div>
    )
  }
}

export default Browse;