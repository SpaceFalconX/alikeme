import React from 'react';
import EntryComponent from './interests/InterestEntryComponent.jsx'
//import Seed from '../seed.js'
import {connect} from 'react-redux';
<<<<<<< f10b61d334a563b3344e50d33ba2a783b2f9ea5a
import { filterFeed } from '../actions/auth_actions.js'
=======
import { filterFeed } from '../actions/actionCreator.js'
import { fetchPostsFromDb } from '../actions/post_actions.js'
>>>>>>> set-up fetchPosts


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
    this.props.dispatch(fetchPostsFromDb)
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