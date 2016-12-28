import React from 'react';
import {SignUpFormComponent} from './formComponents.jsx'

class SignUpComponent extends React.Component {

  render() {
    return (
      <div>
        Sign Up
        <br />
        Choose a username and password
        <br />
        <SignUpFormComponent />
      </div>
    );
  }
}

export default SignUpComponent;