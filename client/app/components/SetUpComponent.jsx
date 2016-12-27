import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';


class SetUpComponent extends React.Component {
  render() {
    return (
      <div>
        Configure your account
        <br />
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