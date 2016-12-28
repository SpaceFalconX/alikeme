import React from 'react'
import EntryComponent from './InterestEntryComponent.jsx'
import Seed from '../../seed.js'

class InterestMatch extends React.Component {
  render () {

    let current = Seed.interests.filter((interest) => {
      return interest.id === parseInt(this.props.params.id)
    })[0]

    return (
      <div>
        <h1>matches/edit</h1>
        <EntryComponent id={current.id} title={current.title} description={current.description} category={current.category} />
        <h2>matches</h2>
        something here
        <h2>edit/delete</h2>
        something else here
      </div>
    )
  }
}

export default InterestMatch