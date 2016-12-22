import React from 'react';
import {browserHistory} from "react-router";
import { Link } from 'react-router'

class HomeComponent extends React.Component {

  BigDogsNav () {
    browserHistory.push('/bigdogs')
  };

  FerretsNav () {
    browserHistory.push('/ferrets')
  };

  BabyFerretsNav () {
    browserHistory.push('/babyferrets')
  };

  render() {
    return (
      <div>
        <h1>Hello from Home!</h1>
        <div> {this.props.children} </div>
        <Link to='/bigdogs'>big dogs</Link>
        <Link to='/ferrets'>link to ferrets</Link>
        <button onClick={this.FerretsNav}>button to ferrets</button>
        <button onClick={this.BabyFerretsNav}>baby</button>
      </div>
    );
  }
}

export default HomeComponent;