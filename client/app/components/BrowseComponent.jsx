import React from 'react';
import EntryComponent from './interests/InterestEntryComponent.jsx'
import Seed from '../seed.js'
import {connect} from 'react-redux';
import { filterFeed } from '../actions/actionCreator.js'


class BrowseComponent extends React.Component {
  constructor(props) {
    super() 
    //storing search term for filtering
    this.state = {
      searchTerm : ''
    }
  }

  filter (e) {
    e.preventDefault()
    this.setState({searchTerm:this.refs.search.value})
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

    let CSS_widthOfInputBox = {
      width:'400px'
    }

    return (
      <div>
        <h1>browse</h1>
            <div className="input-group">
              <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2">lOOk for?</span>
              <input onChange={this.filter.bind(this)} ref='search' style={CSS_widthOfInputBox} className="form-control" placeholder='filter by category' type="text" aria-describedby="sizing-addon2" />
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