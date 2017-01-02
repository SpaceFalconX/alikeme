import React from 'react';
import {browserHistory} from 'react-router';
import Seed from '../../seed.js'

class InterestEntry extends React.Component {

  doSomething () {
    if (this.props.context === "edit") {
      browserHistory.push('/editInterest/' + this.props.id)
    }
    if (this.props.context === "view") {
      browserHistory.push('/viewInterest/' + this.props.id)
    }
  }

  render () {
    let current = Seed.interests.filter((interest) => {
      return interest.id === this.props.id
    })[0]

    return (
      <div onClick={this.doSomething.bind(this)}>
        <h4>{current.title}</h4>
        <h5>{current.user}</h5>
        <p>{current.description}</p>
        <p><i>{current.category}</i></p>
      </div>
    )
  }
}

export default InterestEntry