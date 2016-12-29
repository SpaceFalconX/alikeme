import React from 'react';
import EntryComponent from './interests/InterestEntryComponent.jsx'
import NavBar from './navBar.jsx'
import Seed from '../seed.js'

class BrowseComponent extends React.Component {
  render () {

    let current = Seed.interests.map((interest) => {
      return (
        <EntryComponent key={interest.id} id={interest.id} context="view" />
      )
    })

    return (
      <div>
        <NavBar username={this.props.user.username} />
        <h1>browse</h1>
        {current}
      </div>
    )
  }
}
export default BrowseComponent