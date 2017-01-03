import React from 'react'
import EntryComponent from './InterestEntryComponent.jsx'
import BackButton from '../backButton.jsx'

class InterestView extends React.Component {
  render () {
    return (
      <div>
        <h1>view</h1>
          <EntryComponent id={this.props.params.id}/>
        <BackButton />
      </div>
    )
  }
}

export default InterestView