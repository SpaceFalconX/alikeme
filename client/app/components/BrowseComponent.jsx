import React from 'react';
import EntryComponent from './interests/InterestEntryComponent.jsx'
import Seed from '../seed.js'
import {connect} from 'react-redux';
import { filterFeed } from '../actions/auth_actions.js'


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

  render () {

    let seedResults = Seed.interests.filter(interest => {
      return interest.category.indexOf(this.state.searchTerm) !== -1
    })
    .map((interest) => {
      return (
        <EntryComponent key={interest.post_id} id={interest.post_id} context="view" />
      )
    })

    let storeResults = this.props.posts.filter(interest => {
      return interest.category.indexOf(this.state.searchTerm) !== -1
    })
    .map((interest) => {
      return (
        <EntryComponent key={interest.post_id} id={interest.post_id} context="view" />
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
            {seedResults}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.userPosts
  };
}

export default connect(mapStateToProps)(BrowseComponent)