import React from 'react';

class PublicProfile extends React.Component {
  render () {
    return (
      <div>
      <h1>{this.props.params.username}'s profile</h1>
      look at all this stuff
      </div>
    )
  }
}

export default PublicProfile