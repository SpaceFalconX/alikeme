import React from 'react';

class HomeComponent extends React.Component {
  render() {
    return (
      <div>
        <h4>Ferrets</h4>
        <div> {this.props.children} </div>
      </div>
    );
  }
}

export default HomeComponent;