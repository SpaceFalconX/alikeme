import React from 'react';
import {browserHistory} from 'react-router';
import {SignInComponent} from './formComponents.jsx'

class LandingComponent extends React.Component {

  handleSignUp(e){
    e.preventDefault();
    browserHistory.push('/signup')
  }

  render() {
    return (
      <div>
        <h1>Landing Page</h1>

        <SignInComponent />

        <br />

        <form onSubmit={this.handleSignUp.bind(this)}>
          <input type="submit" value="Sign Up" />
        </form>

      </div>
    );
  }
}

export default LandingComponent;