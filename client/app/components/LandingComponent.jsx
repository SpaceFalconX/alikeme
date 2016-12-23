import React from 'react';
import {Link, browserHistory} from 'react-router';

class LandingComponent extends React.Component {
  constructor(props) {
    super();

    this.state = {
      username: '',
      password: ''
    };

    this.styles = {
      mainStyle: {
        color: 'white',
        fontFamily: 'arial',
        backgroundColor: 'grey',
        textAlign: 'center',
        height: '100%',
        width: '100%',
      },

      buttonStyle: {
        color: 'grey',
        backgroundColor: 'white',
        padding: '5px'
      }
    };
  }

  handleUsername(e){
    this.setState({username: e.target.value})
  }

  handlePassword(e){
    this.setState({password: e.target.value})
  }

  handleSignIn(e){
    e.preventDefault();
    browserHistory.push('/profile/' + this.state.username)
  }

  handleSignUp(e){
    e.preventDefault();
    browserHistory.push('/signup')
  }

  render() {
    return (
      <div style={this.styles.mainStyle}>
        <h1>Landing Page</h1>

        <form onSubmit={this.handleSignIn.bind(this)}>
          <input type="text" value={this.state.username} onChange={this.handleUsername.bind(this)} />
          <input type="password" value={this.state.password} onChange={this.handlePassword.bind(this)}/>
          <input style={this.styles.buttonStyle} type="submit" value="Sign In" />
        </form>

        <br />

        <form onSubmit={this.handleSignUp.bind(this)}>
          <input style={this.styles.buttonStyle} type="submit" value="Sign Up" />
        </form>

      </div>
    );
  }
}

export default LandingComponent;