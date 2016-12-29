import React from 'react'
import EntryComponent from './InterestEntryComponent.jsx'
import Seed from '../../seed.js'

class InterestView extends React.Component {
  render () {

    let current = Seed.interests.filter((interest) => {
      return interest.id === parseInt(this.props.params.id)
    })[0]

    return (
      <div>
        <h1>view</h1>
        <EntryComponent id={current.id} title={current.title} description={current.description} category={current.category} />
      </div>
    )
  }
}

export default InterestView