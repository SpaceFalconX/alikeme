import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import formUpdateAction from '../actions/formUpdateAction.jsx'
import {SignUpFormComponent} from './formComponents.jsx'

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
        <SignUpFormComponent />
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