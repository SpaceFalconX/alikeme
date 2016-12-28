import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import NewInterestComponent from './interests/newInterestComponent.jsx'


class SetUpComponent extends React.Component {
  render() {
    return (
      <div>
        Configure your account
        <br />
        <h2>make your first post</h2>
        <NewInterestComponent />
        <Link to={"/profile/" + this.props.username}>Done</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
  };
}

export default connect(mapStateToProps)(SetUpComponent);