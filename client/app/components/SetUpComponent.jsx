import React from 'react';
import {Link, browserHistory} from 'react-router';


class SetUpComponent extends React.Component {
  constructor(props) {
    super();
    this.styles = {
    };
  }

  render() {
    return (
      <div>
        Configure your account
        <br />
        <Link to={"/profile/" + this.props.params.username}>Done</Link>
      </div>
    );
  }
}

export default SetUpComponent;