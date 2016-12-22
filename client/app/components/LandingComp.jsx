import React from 'react';

class LandingComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      likesCount : 0,
    };
  }

  render() {
    let myStyle = {
      backgroundColor: 'blue',
    };

    return (
      <div style={myStyle}>
        <h1>LANDING PAGE</h1>
      </div>
    );
  }
}

export default LandingComponent;