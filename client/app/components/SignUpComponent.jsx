import React from 'react';
import {Link, browserHistory} from 'react-router';


class SignUpComponent extends React.Component {
  constructor(props) {
    super();

    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsername(e){
    this.setState({username: e.target.value})
  }

  handlePassword(e){
    this.setState({password: e.target.value})
  }

  createNewUser(e){
    e.preventDefault();
    browserHistory.push('/setup/' + this.state.username)
  }

  render() {
    return (
      <div>
        Sign Up
        <br />
        Choose a username and password
        <br />
        <form onSubmit={this.createNewUser.bind(this)}>
          <input type="text" value={this.state.username} onChange={this.handleUsername.bind(this)} />
          <input type="password" value={this.state.password} onChange={this.handlePassword.bind(this)}/>
          <input type="submit" value="Sign In" />
        </form>
      </div>
    );
  }
}

export default SignUpComponent;