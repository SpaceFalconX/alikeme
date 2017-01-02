import React from 'react'

class BackButton extends React.Component {
  navBack () {
    window.history.back();
  }

  render () {
    return (
      <button onClick={this.navBack.bind(this)} className="btn btn-primary">Back</button>
    )
  }
}

export default BackButton