import React from 'react';
import {Link} from 'react-router';


class SetUpComponent extends React.Component {
  constructor(props) {
    super();
    this.styles = {
    };
  }

  render() {
    return (
      <div>
        Configure your account
        <br />
        <Link to="/profile">Done</Link>
      </div>
    );
  }
}

export default SetUpComponent;