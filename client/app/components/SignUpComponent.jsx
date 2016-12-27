import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import formUpdateAction from '../actions/formUpdateAction.jsx'


class SignUpComponent extends React.Component {

  handleUsernameChange(e){
    this.props.formUpdateAction(e.target.value, 'username')
  }

  handlePasswordChange(e){
    this.props.formUpdateAction(e.target.value, 'password')
  }

  createNewUser(e){
    e.preventDefault();
    browserHistory.push('/setup/')
  }

  render() {
    return (
      <div>
        Sign Up
        <br />
        Choose a username and password
        <br />
        <form onSubmit={this.createNewUser.bind(this)}>
          <input type="text" value={this.props.username} onChange={this.handleUsernameChange.bind(this)} />
          <input type="password" value={this.props.password} onChange={this.handlePasswordChange.bind(this)}/>
          <input type="submit" value="Sign In" />
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

export default connect(mapStateToProps, matchDispatchToProps)(SignUpComponent);