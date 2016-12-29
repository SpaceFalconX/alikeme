import React from 'react'
import EntryComponent from './InterestEntryComponent.jsx'
import BackButton from '../backButton.jsx'
import Seed from '../../seed.js'

class InterestMatch extends React.Component {
  render () {

    let current = Seed.interests.filter((interest) => {
      return interest.id === parseInt(this.props.params.id)
    })[0]

    let matches = Seed.interests.filter((interest) => {
      return interest.category === current.category && interest.id !== current.id
    }).map((entry) => {
      return (
        <EntryComponent key={entry.id} id={entry.id} context="view" />
      )
    })

    return (
      <div>
        <h1>viewing your post</h1>
        <EntryComponent id={current.id}/>
        <h1>your matches</h1>
        {matches}
        <h2>edit/delete</h2>
        something else here
        <br />
        <BackButton />
      </div>
    )
  }
}

export default InterestMatch