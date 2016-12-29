import React from 'react'
import EntryComponent from './InterestEntryComponent.jsx'
import Seed from '../../seed.js'

class InterestComponent extends React.Component {

  render () {

    let current = Seed.interests.filter((interest) => {
      return interest.user === this.props.username
    }).map((entry) => {
      return (
        <EntryComponent key={entry.id} id={entry.id} context="edit" title={entry.title} description={entry.description} category={entry.category} />
      );
    })

    return (
      <div>
        {current}
      </div>
    )
  }
}

export default InterestComponent