import React from 'react'

class BackButton extends React.Component {
  navToProfile () {
    window.history.back();
  }

  render () {
    return (
      <button onClick={this.navToProfile.bind(this)} className="btn btn-primary">Back</button>
    )
  }
}

export default BackButton