import React from 'react';
import {Link} from 'react-router';


class SignUpComponent extends React.Component {
  constructor(props) {
    super();
    this.styles = {
    };
  }

  render() {
    return (
      <div>
        Sign Up
        <br />
        <Link to='/setup'>Next steps</Link>
      </div>
    );
  }
}

export default SignUpComponent;