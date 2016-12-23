import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Demo extends React.Component {
  render() {
    return (
      <div>
        TEST
        <br />
        {this.props.users}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    users: state
  };
}

export default connect(mapStateToProps)(Demo);