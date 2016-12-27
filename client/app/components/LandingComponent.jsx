import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import formUpdateAction from '../actions/formUpdateAction.jsx'


class LandingComponent extends React.Component {

  handleSignIn(e){
    e.preventDefault();
    //do some authentication here
    browserHistory.push('/profile/' + this.props.username)
  }

  handleSignUp(e){
    e.preventDefault();
    browserHistory.push('/signup')
  }

  handleUsernameChange(e){
    this.props.formUpdateAction(e.target.value, 'username')
  }

  handlePasswordChange(e){
    this.props.formUpdateAction(e.target.value, 'password')
  }

  render() {
    return (
      <div>
        <h1>Landing Page</h1>

        <form onSubmit={this.handleSignIn.bind(this)}>
          <input type="text" value={this.props.username} onChange={this.handleUsernameChange.bind(this)} />
          <input type="password" value={this.props.password} onChange={this.handlePasswordChange.bind(this)}/>
          <input type="submit" value="Sign In" />
        </form>

        <br />

        <form onSubmit={this.handleSignUp.bind(this)}>
          <input type="submit" value="Sign Up" />
        </form>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
    password: state.password
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    formUpdateAction,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(LandingComponent);