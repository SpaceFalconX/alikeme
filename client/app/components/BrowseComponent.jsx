import React from 'react';
import EntryComponent from './interests/InterestEntryComponent.jsx'
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
        <h1>browse</h1>
        {current}
      </div>
    )
  }
}
export default BrowseComponent