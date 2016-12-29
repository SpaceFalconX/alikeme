import React from 'react'
import {browserHistory} from 'react-router'

class NavBar extends React.Component {

  navTo (url) {
    console.log(url)
    browserHistory.push(url)
  }

  render () {
    return (
      <div>
        <button onClick={this.navTo.bind(this, '/profile/' + this.props.username)} className="btn btn-primary">Profile</button>
        <button onClick={this.navTo.bind(this, '/browse')} className="btn btn-primary">Browse</button>
        <button onClick={this.navTo.bind(this, '/')} className="btn btn-primary">Sign Out</button>
      </div>
    )
  }

}

export default NavBar