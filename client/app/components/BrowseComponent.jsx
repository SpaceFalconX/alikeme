import React from 'react';
import EntryComponent from './interests/InterestEntryComponent.jsx'
import Seed from '../seed.js'
import { filterFeed } from '../actions/actionCreator.js'


class BrowseComponent extends React.Component {
  constructor(props) {
    super(props) 
    
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
    let current = Seed.interests.filter(interest => {
      return interest.category.indexOf(this.state.searchTerm) !== -1
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
            {current.map((interest) => {
                return (
                  <EntryComponent key={interest.id} id={interest.id} context="view" />
                )
            })}
      </div>
    )
  }
}


export default BrowseComponent