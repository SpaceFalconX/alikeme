import React from 'react';
import EntryComponent from './interests/InterestEntryComponent.jsx'
import {connect} from 'react-redux';
import { filterFeed } from '../actions/auth_actions.js'
import { fetchPostsFromDb } from '../actions/post_actions.js'


class BrowseComponent extends React.Component {
  constructor(props) {
    super()

    this.state = {
      searchTerm : ''
    }
  }

  filter (e) {
    e.preventDefault()
    this.setState({searchTerm:this.refs.search.value})
    this.refs.search.value = ""
  }

  componentWillMount() {
    this.props.dispatch(fetchPostsFromDb())
  }

  render () {
    // let storeResults = this.props.posts.filter(post => {
    //   return post.category.name.indexOf(this.state.searchTerm) !== -1
    // })
    // .map((post) => {
    //   return (
    //     <EntryComponent key={post.id} context="view" post={post} />
    //   )
    // })

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
                  <EntryComponent key={post.id} post={post} />
                )})
              }
            </div>
      </div>
    )
  }
}

export default BrowseComponent;