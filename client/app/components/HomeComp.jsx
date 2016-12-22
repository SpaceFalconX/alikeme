import React from 'react';

class HomeComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello from Home!</h1>
        <div> {this.props.children} </div>
      </div>
    );
  }
}

export default HomeComponent;