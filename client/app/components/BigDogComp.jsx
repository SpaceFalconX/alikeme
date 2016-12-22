import React from 'react';

class BigDogsComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      likesCount : 0,
      display: 'zero',
      top: 200,
      left: 200
    };
  }

  onCountUp () {
    this.setState({
      likesCount: this.state.likesCount + 5,
      top: this.state.top + 10,
      left: this.state.left + 10
    });
    this.setDisplay();
  }

  onCountDown () {
    this.setState({
      likesCount: this.state.likesCount - 5,
      top: this.state.top - 10,
      left: this.state.left - 10
    });
    this.setDisplay();
  }

  setDisplay () {
    if(this.state.likesCount % 2 === 0){
      this.setState({
        display: 'even'
      })
    } else {
      this.setState({
        display: 'odd'
      })
    }
  }

  render() {
    let myStyle = {
      color: 'red',
      backgroundColor: 'blue',
      position: 'absolute',
      top: this.state.top,
      left: this.state.left
    };
    return (
      <div>
        <h4>{this.state.display}</h4>
        Likes : <h1 style={myStyle}>{this.state.likesCount}</h1>
        <div>
          <button onClick={this.onCountUp.bind(this)}>Add 5</button>
          <button onClick={this.onCountDown.bind(this)}>Remove 5</button>
        </div>
      </div>
    );
  }
}

export default BigDogsComponent;