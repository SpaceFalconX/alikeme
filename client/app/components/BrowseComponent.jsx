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
    //call dispatch to fetch data from server
    this.props.dispatch(fetchPostsFromDb())
  } 
  
  render () {
    // let seedResults = Seed.interests.filter(interest => {
    //   return interest.category.indexOf(this.state.searchTerm) !== -1
    // })
    // .map((interest) => {
    //   return (
    //     <EntryComponent key={interest.post_id} id={interest.post_id} context="view" />
    //   )
    // })               {seedResults}

    let storeResults = this.props.posts.filter(post => {
      return post['category_name'].indexOf(this.state.searchTerm) !== -1
    })
    .map((post) => {
      return (
        <EntryComponent key={post.id} context="view" post={post} />
      )
    })

    return (
      <div>
        <h1>browse</h1>
            <div className="input-group">
              <span>search</span>
              <form onSubmit={this.filter.bind(this)}>
              <input ref='search' placeholder='filter by category' type="text" />
              <button>search</button>
              </form>
            </div>
            {storeResults}

      </div>
    )
  }
}

export default BrowseComponent;