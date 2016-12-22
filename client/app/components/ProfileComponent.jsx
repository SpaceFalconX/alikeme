import React from 'react';
import {Link} from 'react-router';


class ProfileComponent extends React.Component {
  constructor(props) {
    super();
    this.styles = {
    };
  }

  render() {
    return (
      <div>
        My Profile
        <br />
        {this.props.params.username}
        <br />
        <Link to="/">Sign Out</Link>
      </div>
    );
  }
}

export default ProfileComponent;